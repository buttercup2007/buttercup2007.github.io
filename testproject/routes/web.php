<!DOCTYPE html>
<html>
<body>
  <h1>Hello world</h1>
</body>
</html>

<?php
Route::get('/', function () {
    return view('hello');
});
