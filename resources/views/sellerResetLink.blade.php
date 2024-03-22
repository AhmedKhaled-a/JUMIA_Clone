<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>

<div>

    <br>
    Welcome in jumia Clone!
    <br>
    This is your password reset link!
    <br>
    Please click on the link below or copy it into the address bar of your browser to reset your password:
    <br>

    {{-- <a href="{{ url('api/seller/resetPassword', $remember_token)}}">reset your password </a> --}}
    <a href="http://localhost:3000/seller/reset-Password/request/{{$remember_token}}">reset your password </a>

    <br/>
</div>

</body>
</html>
