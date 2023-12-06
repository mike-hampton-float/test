# ${FULL_SERVICE_NAME}

## Additional Extensions

Here are some common extensions you way want to add:

```xml
<!-- Sends events to the audit svc -->
<dependency>
  <groupId>com.setscale.audit</groupId>
  <artifactId>java-client-async</artifactId>
  <version>1.3</version>
</dependency>
<!-- Naming strategy for Hibernate - i.e. CustomerAddress to customer_address -->
<dependency>
  <groupId>com.setscale.common</groupId>
  <artifactId>naming-strategy</artifactId>
  <version>1.1.0</version>
</dependency>
<!-- Adds a correlation-id to all requests if there isn't one -->
<dependency>
  <groupId>com.setscale.common</groupId>
  <artifactId>quarkus-filter-correlation</artifactId>
  <version>1.1.2</version>
</dependency>
<!-- Maps error responses to a common format -->
<dependency>
  <groupId>com.setscale.common</groupId>
  <artifactId>quarkus-exception-handler</artifactId>
  <version>1.1.1</version>
</dependency>
<!-- Adds beans related to OIDC connections to -->
<dependency>
  <groupId>com.setscale.common</groupId>
  <artifactId>quarkus-keycloak</artifactId>
  <version>1.0</version>
</dependency>
```

Or you can add a dependency which includes all of those:

```xml
<dependency>
  <groupId>com.setscale.common</groupId>
  <artifactId>common-web</artifactId>
  <version>1.1</version>
  <type>pom</type>
</dependency>
```

## JDBC Url

When setting the JDBC url, be sure to include the schema so Flyway doesn't run
migrations in the public schema:

      quarkus:
        jdbc:
          url: jdbc:postgresql://127.0.0.1:5432/${SERVICE_PACKAGE_NAME}?currentSchema=${SERVICE_PACKAGE_NAME}

## Local development

Use docker compose to start the back end services (postgres, keycloak):

```bash
docker compose --profile dev --env-file ./service/.env up
```
An IntelliJ launcher named "service" will be created by Quarkus and you can use this to launch/debug your service.

Alternatively, you can run the entire stack (back end services plus \${FULL_SERVICE_NAME}, assuming you have built the ${FULL_SERVICE_NAME} container locally)

```bash
docker compose --profile all --env-file ./service/.env up
``` 

The ./service/.env file is required.  Please see the template.env and the [wiki](https://wiki.float.financial/Developer%20Central/Creating%20a%20microservice/) for more information.

Note: All services have a profile, so a generic ```docker compose up``` won't do anything. You must specify a profile or a service with ```docker compose up $service```

## Building locally

If you want to build the ${FULL_SERVICE_NAME} locally

 ```bash
 mvn package -DskipTests \
   -Dquarkus.container-image.build=true \
   -Dquarkus.container-image.repository= \
   -Dquarkus.container-image.group= \
   -Dquarkus.container-image.name=seller-deal-svc \
   -Dquarkus.container-image.tag=latest
 ```
