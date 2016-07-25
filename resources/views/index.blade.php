<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Angular-Laravel Authentication</title>
        <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css">
    </head>
    <body ng-app="App">        
        <header ng-controller='headerController as header'>
{{--        1 - Создаем вьюху с полями
            2 - Делаем валидацию полей
            3 - Делаем систему обработки и вывода ошибок
            4 - Добавляем кнопку submit и отправляем данные на сервер
            5 - На сервере пишем валидацию полученых данных
            6 - Создаем запись в базе данных 
            7 - Возвращаем данные  --}}
            <div class="reg-auth">
                <button class='btn-link' ui-sref='registration'>Регистрация</button>
                <button class='btn-link' ui-sref='auth'>Логин</button>
            </div>
        </header>        
        <div class="container">
        	<div ui-view></div>
        </div>        
     
    </body>

    <!-- Application Dependencies -->
    <script src="node_modules/angular/angular.js"></script>
    <script src="node_modules/angular-ui-router/release/angular-ui-router.js"></script>
    <script src="node_modules/satellizer/dist/satellizer.js"></script>

    <!-- Application Scripts -->
    <script src="scripts/app.js"></script>
    <script src="scripts/authController.js"></script>
    <script src="scripts/userController.js"></script>
    <script src="scripts/headerController.js"></script>
    <script src="scripts/registrationController.js"></script>
    <script src="scripts/homeController.js"></script>



</html>