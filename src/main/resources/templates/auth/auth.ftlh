<#--
<#macro form action label>
    <#assign
        label =
&lt;#&ndash;        UGLY!&ndash;&gt;
        &lt;#&ndash;isRegisterForm = state == "REGISTRATION"
        isLoginForm = state == "LOGIN"
        isLogoutForm = state == ""&ndash;&gt;
    >&lt;#&ndash;
    <#if isRegisterForm>
        <#assign label = "Sign Up" >
    <#else>
        <#assign label = "Sign In">
    </#if>&ndash;&gt;
    <form action="${action}" method="post">
        <div class="form-group row">
            <label class="col-sm-2 col-form-label"> User Name :</label>
            <div class="col-sm-6">
                <input type="text" name="username" class="form-control" placeholder="Username"/>
            </div>
        </div>

        <div class="form-group row">
            <label class="col-sm-2 col-form-label"> Password :</label>
            <div class="col-sm-6">
                <input type="password" name="password" class="form-control" placeholder="Password"/>
            </div>
        </div>&lt;#&ndash;
        <#if isRegisterForm>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label"> Email :</label>
                <div class="col-sm-6">
                    <input type="email" name="email" class="form-control" placeholder="Email"/>
                </div>
            </div>
        </#if>&ndash;&gt;

        <input type="hidden" name="_csrf" value="${ _csrf.token }">
        <div><button class="btn btn-primary" type="submit">${label}</button></div>
    </form>
</#macro>-->
