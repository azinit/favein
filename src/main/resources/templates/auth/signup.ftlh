<#import '../includes/app.ftlh' as app>
<#import '../includes/controls.ftlh' as controls>

<@app.page>
    <section class="jumbotron text-center">
        <h1>Регистрация</h1>
        <p>Создайте себе новый аккаунт</p>
    </section>

    <div class="container p-md-5">
        <#if error??>
            <div class="alert alert-danger" role="alert">
                ${error}
            </div>
        </#if>
        <#if logout??>
            You have been logged out.
        </#if>
        <form action="/signup" method="post">
            <@controls.input label='Email' name='email' type="email"/>
            <@controls.input label='Логин *' name='username' placeholder="Логин"
                is_required=true/>
            <@controls.input label='Пароль *' name='password' placeholder="Пароль"
                type="password" is_required=true/>
            <@controls.csrf token="${ _csrf.token }"/>
            <@controls.button label="Зарегистрироваться" type="submit"></@controls.button>
        </form>
    </div>
</@app.page>