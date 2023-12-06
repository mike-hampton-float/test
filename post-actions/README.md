# Quarkus Post Template Action
Script that replaces variables in new repos created from the quarkus-template repo.

## Overview
Run as an "action" from the Github UI after creating a new repo from the quarkus-template.  Replaces the following tokens:
 - ${FULL_SERVICE_NAME}    - name of the repository, e.g. data-protection-svc
 - ${SERVICE_NAME}         - name of the repository minus the svc suffix, e.g. data-protection
 - ${SERVICE_PACKAGE_NAME} - name of the repository with all spaces, _s, and -s replaced with "", // e.g. dataprotection

Once the action runs the post-actions directory is removed and the token replacements are automatically committed.

## Building
A build is required each time a change is made to src/index.js.  To build:

To build:
 - Install @vercel/ncc `npm i -g @vercel/ncc`
 - `npm run build`
