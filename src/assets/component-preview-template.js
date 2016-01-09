let template = `<!DOCTYPE html>
                <html>
                <head>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.13/vue.js"></script>
                    <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
                    <script>
                    Vue.mixin({
                      replace: false
                    })
                    </script>
                    <style>
                      <%= style %>
                    </style>
                </head>

                <body>
                    <div id="container">
                        <<%= name %> <%= properties %>><<%= name %>>
                    </div>

                    <script>
                        var <%= name %> = <%= comp %>;
                        var actions = <%= actions %>;

                        var methods = actions.reduce(function(methods, action) {
                          methods[action] = function() {
                            window.parent.$('#iframe-container').trigger('actionInvoked')
                          };
                          return methods;
                        }, {});

                        <%= name %>.methods = methods;

                        new Vue({
                            el: '#container',
                            <%= data %>,
                            components: {
                                <%= name %>: <%= name %>
                            }
                        })
                    </script>
                </body>
                </html>`

export default template
