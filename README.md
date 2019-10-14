# vanguard-services
Raid import/export, storage, and whatever else we need

## Infrastructure

- Runs on GCP Kubernetes
  - See: `deployment/vanguard-k8s.yaml`
- Uses GCP Cloud SQL (postgres flavor)
- App containers build with GCP CloudBuild and are stored in GCR
  - master: `gcr.io/vanguard-255823/vanguard-services:master`
  - Images for each `master` sha also exist

## Deployment

Commit something to `master`

## Developing Locally

`npm i && npm start`