<#import '../includes/app.ftlh' as app />

<@app.page>
    <section class="jumbotron text-center">
        <h1>Admin panel</h1>
    </section>
    <section class="jumbotron bg-white text-center">
        <h2>Labels</h2>
        <div class="labels-list">
        <#list labels as label>
            <span style="background-color: ${label.color}" class="p-2 rounded text-white ml-1">
                ${label.name}
            </span>
        <#else>
            <span>У вас пока не настроены свои метки</span>
        </#list>
        </div>
    </section>
</@app.page>