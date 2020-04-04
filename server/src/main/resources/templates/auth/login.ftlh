<#import '../includes/app.ftlh' as app>
<#import '../includes/controls.ftlh' as controls>

<@app.page>
    <section class="jumbotron text-center">
        <h1>Авторизация</h1>
        <p>Войдите в аккаунт</p>
    </section>

    <div class="container p-md-5">
        <#if error??>
            Неверный логин или пароль
        </#if>
        <#if logout??>
            Вы вышли
        </#if>
        <form action="/login" method="post">
            <@controls.input label='Логин' name='username'/>
            <@controls.input label='Пароль' name='password' type="password"/>
            <@controls.csrf token="${ _csrf.token }"/>
            <@controls.button label="Зайти"></@controls.button>
        </form>
        <a href="/signup" class="text-info">Создать аккаунт</a>
    </div>
</@app.page>