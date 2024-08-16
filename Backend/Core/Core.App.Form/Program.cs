using Core.App.Form.Data;
using Microsoft.EntityFrameworkCore;
var MyAllowSpecificOrigins = "CorsPolicy";
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<CoreDbContext>(opt => 
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddControllers().ConfigureApiBehaviorOptions(options =>
{
    options.SuppressConsumesConstraintForFormFileParameters = true;
    options.SuppressInferBindingSourcesForParameters = true;
    options.SuppressModelStateInvalidFilter = true;
    options.SuppressMapClientErrors = true;
    options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
        "https://httpstatuses.com/404";
});
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().SetIsOriginAllowed((host) => true);
        });
});
var app = builder.Build();

// var webSocketOptions = new WebSocketOptions
// {
//     KeepAliveInterval = TimeSpan.FromMinutes(2)
// };
//
// app.UseWebSockets(webSocketOptions);

app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();
app.Run();
