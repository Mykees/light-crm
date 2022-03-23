
## Light CRM built with SF5 - API PLATFORM - REACT JS

[![pipeline status](https://gitlab.com/mykeesr/light-crm/badges/main/pipeline.svg)](https://gitlab.com/mykeesr/light-crm/-/commits/main)

Symfony app that allows you to manage Invoice, Customers and Users.

### Features :
- Authentication with JWT (JSON WEB TOKEN)
- Manage (CRUD) Customers,Invoices and Users
- Filter Data
- Pagination
- Test Unit (Postman)
- Continuous Integration (Gitlab CI)


### DEMO:
#### [Light-crm App](https://light-crm.herokuapp.com/)



### Simple local installation :
clone project:
``` 
https://github.com/Mykees/light-crm.git  
```  
Go to lightcrm folder:
```  
cd lightcrm && docker-compose up -d  
``` 
Launch migrations:
```
php bin/console doctrine:migrations:migrate --no-interaction
```

Launch fixtures:
```
php bin/console doctrine:fixtures:load --no-interaction
```

Start dev-server:
```
npm run dev-server
```

Got to home url:

[http://127.0.0.1:80001](http://127.0.0.1:80001)

Launch Test