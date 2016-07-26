
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Laravel</title>

  <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css">
    <style>
        [ui-sref] {
            cursor: pointer;
        }
        [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
            display: none !important;
        }
    </style>
  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
<body ng-app='App' ng-cloak>

<!--============================
=            Header            =
=============================-->

<header ng-controller='headerController as header'>
    <nav class="navbar navbar-default">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span class="sr-only">Toggle Navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Advance</a>
          </div>

          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li><a class='btn-link' ui-sref='game'>Игра</a></li>
              <li><a class='btn-link' ui-sref='users' ng-if='authenticated'>Статистика</a></li>
              <li><a class='btn-link' ui-sref='admin' ng-if='currentUser.admin'>Админка</a></li>

            </ul>

            <ul ng-if='!authenticated' class="nav navbar-nav navbar-right">
                <li><a class='btn-link' ui-sref='auth'>Логин</a></li>
                <li><a class='btn-link' ui-sref='registration'>Регистрация</a></li>
            </ul>
            <ul ng-if='authenticated' class="nav navbar-nav navbar-right">
                <li class="dropdown">
                  <a class='btn-link' class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">@{{currentUser.name}}<span class="caret"></span></a>
                  <ul class="dropdown-menu" role="menu">
                    <li><a class='btn-link' ng-click="header.logout()" style="cursor:pointer;">Logout</a></li>
                  </ul>
                </li>
            </ul>
          </div>
        </div>
    </nav>
</header>

<!--====  End of Header  ====-->


<!--=============================
=            Content            =
==============================-->
<div class="container">
    <div ui-view></div>
</div> 
<!--====  End of Content  ====-->

<!--=============================
=            Scripts            =
==============================-->

    <!-- Scripts -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/js/bootstrap.min.js"></script>
    
  
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

<!--====  End of Scripts  ====-->

</body>
</html>