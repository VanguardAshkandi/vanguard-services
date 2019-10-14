# vanguard-services
Raid import/export, storage, and whatever else we need

Home: http://34.102.179.198/
API Docs: http://34.102.179.198/docs
Upload: http://34.102.179.198/upload.html

## Infrastructure

- Runs on GCP Kubernetes
  - See: `deployment/vanguard-k8s.yaml`
- Uses GCP Cloud SQL (postgres flavor)
- App containers build with GCP CloudBuild and are stored in GCR
  - master: `gcr.io/vanguard-255823/vanguard-services:master`
  - Images for each `master` sha also exist
- DNS
  - `TODO`

## Deployment

Commit something to `master`.  If tests pass, CI will spit it out into the cloud.

## Developing Locally

1. Install Node
1. Install Postgres
1. Create db `vanguard_test` and user `vanguard:vanguard`

  ```
  CREATE DATABASE vanguard_test;
  CREATE USER vanguard WITH PASSWORD 'vanguard';
  \c vanguard_test
  GRANT USAGE ON SCHEMA public to vanguard;
  GRANT ALL ON ALL TABLES IN SCHEMA public to vanguard;
  GRANT ALL ON ALL SEQUENCES IN SCHEMA public to vanguard;
  GRANT ALL ON ALL FUNCTIONS IN SCHEMA public to vanguard;
  ```

1. `npm i && npm start`
1. Go to `http://localhost:3000`