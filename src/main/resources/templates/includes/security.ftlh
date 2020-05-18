<#assign
    isAuth = Session.SPRING_SECURITY_CONTEXT??
>
<#if isAuth>
    <#assign
        user = Session.SPRING_SECURITY_CONTEXT.authentication.principal
        username = user.getUsername()
        isAdmin = user.isAdmin()
    >
<#else>
    <#assign
        <#--        user = null-->
        username = "anonymous"
        isAdmin = false
    >
</#if>