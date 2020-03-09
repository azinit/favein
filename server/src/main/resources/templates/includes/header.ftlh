<header>
    <div class="d-flex flex-row">
        <nav class="navbar navbar-expand navbar-dark bg-dark col">
            <div class="navbar-brand col-6 align-content-center col">
                <a href="/" class="stretched-link text-white text-decoration-none">
                    <img src="/app/favicon.png" width="20" height="20" class="d-inline-block align-content-center" alt="">
                    <span class="d-inline-block">FaveIn</span>
                </a>
                <#if isAuth><small class="text-muted">(${name})</small></#if>
            </div>
            <div class="collapse navbar-collapse col-6 flex-row-reverse">
                <div class="navbar-nav">
                    <a href="/" class="nav-item nav-link">Главная</a>
                    <a href="/admin" class="nav-item nav-link text-warning">Админка</a>
                    <#if isAuth>
                        <form action="/logout" method="post" class="auth-btn">
                            <input type="hidden" name="_csrf" value="${ _csrf.token }">
                            <button class="btn btn-secondary" type="submit">Выйти</button>
                        </form>
                    <#else>
                        <a href="/login" class="btn btn-info auth-btn">Войти</a>
                    </#if>
                </div>
            </div>
        </nav>
    </div>
</header>