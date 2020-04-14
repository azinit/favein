<#include '../includes/security.ftlh'>
<#import '../includes/app.ftlh' as app>
<#import '../includes/controls.ftlh' as controls>

<@app.page>
    <section class="jumbotron">
        <div class="container">
            <div class="card">
                <div class="card-header text-center">
                    Fave
                </div>
                <div class="card-body">
                    <h5 class="card-title text-center">
                        Paste your link here
                    </h5>
                    <div class="m-4">
                        <form
                                method="post" action="/fave"
                                class="d-flex justify-content-center flex-column" style="flex-grow: 1"
                        >
                            <@controls.input
                            name="link"
                            label="Your link"
                            placeholder="medium.com/..."
                            />
                            <@controls.select
                            label="Dashboard"
                            options=dashboards
                            name="dashboard"
                            />
                            <@controls.csrf
                            token="${ _csrf.token }"
                            />
                            <@controls.button
                            label="Add"
                            type="submit"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="jumbotron bg-white">
        <h1>New fave</h1>
        <p>Hello, ${username}</p>
    </section>
</@app.page>
