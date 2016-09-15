
<!DOCTYPE html>
<html lang="en" ng-app='App' ng-cloak>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css">
  <link rel="stylesheet" href="node_modules/ng-table/dist/ng-table.min.css">
  <link rel="stylesheet" href="node_modules/angular-ui-notification/dist/angular-ui-notification.min.css">
  <link rel="stylesheet" href="bower_components/angular-ui-router-anim-in-out/css/anim-in-out.css">
  <link rel="stylesheet" href="css/main.css">
  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
  <title ng-bind='title'></title>
</head>
<body>

<!--============================
=            Header            =
=============================-->

<header ng-controller='HeaderController as header'>
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
              <li ng-class="header.menuClass('game')"><a class='btn-link' ui-sref='game'>Игра</a></li>
              <li ng-class="header.menuClass('users')"><a class='btn-link'  ng-if='authenticated' ui-sref='users'>Статистика</a></li>
              <li ng-class="header.menuClass('admin')"><a class='btn-link' ui-sref='admin' ng-if='currentUser.admin'>Админка</a></li>

            </ul>

            <ul ng-if='!authenticated' class="nav navbar-nav navbar-right">
                <li ng-class="header.menuClass('auth')"><a class='btn-link' ui-sref='auth'>Логин</a></li>
                <li ng-class="header.menuClass('registration')"><a class='btn-link' ui-sref='registration'>Регистрация</a></li>
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
    <div ui-view class='anim-in-out anim-slide-left view-container' data-anim-sync data-anim-speed='200'></div>
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
    <script src="node_modules/ng-table/dist/ng-table.min.js"></script>\
    <script src="node_modules/underscore/underscore-min.js"></script>
    <script src="node_modules/angular-ui-notification/dist/angular-ui-notification.min.js"></script>
    <script src="node_modules/angular-ui-notification/dist/angular-ui-notification.min.js"></script>
    <script src="node_modules/angular-timer/dist/angular-timer.min.js"></script>
    <script src="node_modules/moment/min/moment.min.js"></script>
    <script src="bower_components/humanize-duration/humanize-duration.js"></script>
    <script src="bower_components/angular-animate/angular-animate.min.js"></script>
    <script src="bower_components/angular-ui-router-anim-in-out/anim-in-out.js"></script>

    <!-- Application Scripts -->
    <script src="scripts/app.js"></script>
    <script src="scripts/routes.js"></script>
    <script src="scripts/authentication.cfg.js"></script>

    <!-- services -->
    <script src="scripts/services/login.js"></script>
    <script src="scripts/services/dataService.js"></script>
    <script src="scripts/services/timerService.js"></script>
    <script src="scripts/services/quotesService.js"></script>


    <script src="scripts/auth/authController.js"></script>
    <script src="scripts/stats/userController.js"></script>
    <script src="scripts/headerController.js"></script>
    <script src="scripts/auth/registrationController.js"></script>
    <script src="scripts/intro/introController.js"></script>
    <script src="scripts/admin/adminController.js"></script>
    <script src="scripts/admin/usersController.js"></script>
    <script src="scripts/admin/quotesController.js"></script>
    <script src="scripts/admin/addQuoteController.js"></script>
    <script src="scripts/game/gameController.js"></script>




    <!-- Directives -->
    <script src="scripts/directives/demoTrackedTable.js"></script>
    <script src="scripts/directives/demoTrackedTableRow.js"></script>
    <script src="scripts/directives/demoTrackedTableCell.js"></script>
    <script src="scripts/directives/myGameDirective.js"></script>
    <script src="scripts/directives/myCustomTabs.js"></script>


<!--====  End of Scripts  ====-->

</body>
</html>