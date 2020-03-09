<#import '../includes/app.ftlh' as app />
<#import '../includes/controls.ftlh' as controls>

<@app.page>
    <section class="jumbotron text-center">
        <h1>Admin panel</h1>
    </section>
    <section class="jumbotron bg-white text-center shadow">
        <h2>Users</h2>
        <div class="users-list card-deck d-flex justify-content-center mt-4">
            <#list users as user>
                <@controls.quote
                    mt=0
                    mb=5
                    header=user.username
                    body=user.email
                    footer=user.getStatus()
                />
            <#else>
                <div>В сервисе пока нет пользователей</div>
            </#list>
        </div>
    </section>
    <section class="jumbotron bg-white text-center shadow">
        <h2>Labels</h2>
        <div class="labels-list mt-4">
            <#list labels as label>
                <span style="background-color: ${label.color}" class="p-2 rounded text-white ml-1">
                ${label.name}
            </span>
            <#else>
                <span>В сервисе пока никто не настраивал свои метки</span>
            </#list>
        </div>
    </section>
    <section class="jumbotron bg-white text-center shadow">
        <h2>Dashboards</h2>
        <div class="dashboard-list mt-4 card-deck">
            <#list boards as board>
                <div class="card mb-3">
                    <img src="${board.background}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${board.name}</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Author: ${board.author.username}</small></p>
                    </div>
                </div>
            </span>
            <#else>
                <span>В сервисе пока нет ни одного dashboard'а</span>
            </#list>
        </div>
    </section>
</@app.page>