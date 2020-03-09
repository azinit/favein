<#assign
    isAuth = Session.SPRING_SECURITY_CONTEXT??
>
<#if isAuth>
    <#assign
        user = Session.SPRING_SECURITY_CONTEXT.authentication.principal
        name = user.getUsername()
        <#--        isAdmin = user.isAdmin()-->
    >
<#else>
    <#assign
        <#--        user = null-->
        name = "anonymous"
        <#--        isAdmin = false-->
    >
</#if>