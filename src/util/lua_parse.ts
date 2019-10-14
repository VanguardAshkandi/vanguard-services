import * as parser from 'luaparse';

const defaultOptions = {
  comments: false
};

const eventParsers = {
  'RAID_START': parseRaidStartEvent,
  'RAID_END': parseRaidEndEvent
};

function parseRaidDBRoot(ast, raids, errors) {
  const rdbAssign = ast.body.find(item => {
    // Find an assignment statement to the variable "RaidDB"
    return item.type === 'AssignmentStatement' && item.variables.some(itemVar =>
      itemVar.name === 'RaidDB'
    );
  });

  if(rdbAssign) {
    parseRaidEntries(rdbAssign.init, raids, errors);
  } else {
    errors.push('Could not find assignment to variable "RaidDB"');
  }
}

function parseRaidEntries(ast, raids, errors) {
  const tableRoot = ast.find(item => 
    item.type === 'TableConstructorExpression' && item.fields.some(itemField =>
      itemField.type === 'TableKey'
    )
  );

  if(tableRoot) {
    const raidRoots = tableRoot.fields.filter(field => field.type === 'TableKey').map(raidRoot => {
      return {
        raid_id: raidRoot.key.value,
        events: parseRaidEvents(raidRoot.value, errors)
      }
    });

    raids.push(...raidRoots);
  } else {
    errors.push('Cannot find table constructor from RaidDB assignment');
  }
}

function parseRaidEvents(ast, errors) {
  if(ast.type === 'TableConstructorExpression') {
    // Find each event, and pass the nodes to the appropriate handler
    const events = ast.fields.filter(field => field.type === 'TableValue').map(field => {
      const typeField = field.value.fields.find(subField => subField.type === 'TableKey' && subField.key.value === 'EVENT_TYPE');
      const dataField = field.value.fields.find(subField => subField.type === 'TableKey' && subField.key.value === 'EVENT_DATA');
      if(!typeField) {
        errors.push('Cannot find EVENT_TYPE field in raid event item');
        return;
      }
      if(!dataField) {
        errors.push('Cannot find EVENT_DATA field in raid event item');
        return;
      }

      const type = typeField.value.value;
      const handler = eventParsers[type];

      if(!handler) {
        errors.push(`No handler for raid event: ${type}`);
        return;
      }

      return {
        type,
        data: handler(dataField, errors)
      }
    });
  } else {
    errors.push(`Failed to parse event - expected a TableConstructorExpression, but found: ${ast.type}`);
  }
}

function parseRaidStartEvent(ast, errors) {
  return {};
}

function parseRaidEndEvent(ast, errors) {
  return {}
}

// Expects a Lua script with an assignment to a variable called "RaidDB"
// Converts whatever is assigned there into a structure for internal consumption
export function parseRaidDB(raidDB) {
  try {
    const ast = parser.parse(raidDB, defaultOptions);
    // console.log(JSON.stringify(ast));
    const errors = [];
    const raids = [];

    parseRaidDBRoot(ast, raids, errors);

    return {
      result: raids,
      errors
    }
  } catch(e) {
    return {
      result: null,
      errors: [e.message],
      exception: e
    }
  }
}
