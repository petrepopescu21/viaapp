<template>
    <div id="main" role="main" class="main-home">
            <h1 class="h1-title">Welcome back!</h1>
            <p class="sub-header">Sign in to help someone who can't see or to be helped.</p>
    
            <button class="third-bt" role="button" aria-label="Sign in with Google">Sign in With Google</button>
            <a href="/auth/facebook"><button class="third-bt" role="button" aria-label="Sign in with Facebook">Sign in With Facebook</button></a>

            <button class="third-bt primary-bt" role="button" aria-label="Go to Sign Up">SIGN UP</button>
        </div>
</template>

<script>

export default {
    layout: 'login'
}
</script>
