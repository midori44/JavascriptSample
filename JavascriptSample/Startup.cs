using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(JavascriptSample.Startup))]
namespace JavascriptSample
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
