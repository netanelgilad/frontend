let template = `<!DOCTYPE html>
                <html>
                <head>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.13/vue.js"></script>
                </head>

                <body>
                    <div id="container">
                        <<%= name %>><<%= name %>>
                    </div>

                    <script>
                        var <%= name %> = <%= comp %>;
                        new Vue({
                            el: '#container',
                            data: {
                                message: 'Hello Vue.js!'
                            },
                            components: {
                                <%= name %>: <%= name %>
                            }
                        })
                    </script>
                </body>
                </html>`

export default template
