<#--todo: additional classes-->

<#macro input label name placeholder=label value="" type="text" is_required=false>
    <div class="form-group row">
        <label class="col-sm-2 col-form-label">${label}:</label>
        <div class="col-sm-6">
            <input type="${type}" class="form-control" <#if is_required>required</#if>
                   name="${name}" placeholder="${placeholder}" value="${value}"
            />
        </div>
    </div>
</#macro>

<#macro csrf token>
    <input type="hidden" name="_csrf" value="${ token }">
</#macro>

<#macro button label type="submit">
    <div class="form-group">
        <button class="btn btn-info" type="${type}">${label}</button>
    </div>
</#macro>

<#macro diff value strict=false>
    <#if strict>
        <#assign success="text-danger">
    <#else>
        <#assign success="text-success">
    </#if>

    <#if (value == 0)>
        <span class="text-muted">${ value }</span>
    <#elseif (value > 0)>
        <span class="${success}">+ ${ value }</span>
    <#else>
        <span class="text-danger">${ value }</span>
    </#if>
</#macro>

<#macro card mt=2 mb=2 header="HEADER" body="TEXT" footer="FOOTER">
    <div class="card mt-${mt} mb-${mb}">
        <div class="card-header">
            <span>${header}</span>
        </div>
        <div class="card-body">
            <span>${body}</span>
        </div>
        <div class="card-footer">
            <i>${footer}</i>
        </div>
    </div>
</#macro>

<#macro card_action
header="Card title" body="Some quick example text to build on the card title and make up the bulk of the card's content."
img="img/action-card.jpg" action_label="Перейти" action_url="#">
    <div class="card" style="width: 18rem;">
        <img src="${img}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${header}</h5>
            <p class="card-text">${body}</p>
            <a href="${action_url}" class="btn btn-dark">${action_label}</a>
        </div>
    </div>
</#macro>

<#macro card_overlay>
    <div class="card bg-dark text-white">
        <img src="img/action-card.jpg" class="card-img" alt="...">
        <div class="card-img-overlay">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
                content. This content is a little bit longer.</p>
            <p class="card-text">Last updated 3 mins ago</p>
        </div>
    </div>
</#macro>

<#macro quote mt=2 mb=2 header="HEADER" body="TEXT" footer="FOOTER">
    <div class="card mt-${mt} mb-${mb}">
        <div class="card-header">
            <span>${header}</span>
        </div>
        <div class="card-body">
            <blockquote class="blockquote mb-0">
                <p><span>${body}</span></p>
                <div class="blockquote-footer">${footer}</div>
            </blockquote>
        </div>
    </div>
</#macro>

<#macro mood value>
    <#if (value == "ANGRY")>
        <span class="text-danger">${ "😡 Злость" }</span>
    <#elseif (value == "SAD")>
        <span class="text-warning">${ "😞 Грусть" }</span>
    <#elseif (value == "TIRED")>
        <span class="text-secondary">${ "🙁 Усталость" }</span>
    <#elseif (value == "OK")>
        <span class="text-info">${ "🙂 Ок" }</span>
    <#elseif (value == "SATISFIED")>
        <span class="text-primary">${ "😉 Удовлетворенность" }</span>
    <#elseif (value == "PRODUCTIVE")>
        <span class="text-success">${ "😉 Продуктивность" }</span>
    <#else>
        <span>${ value }</span>
    </#if>
</#macro>