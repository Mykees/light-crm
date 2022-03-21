
## Light CRM built with SF5 - API PLATFORM - REACT JS

Symfony app that allows you to manage Invoice, Customers and Users.

### Features :
- Authentication with JWT (JSON WEB TOKEN)
- Manage (CRUD) Customers,Invoices and Users
- Filter Data
- Pagination

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
Got to home url:

[http://127.0.0.1:80001](http://127.0.0.1:80001)
