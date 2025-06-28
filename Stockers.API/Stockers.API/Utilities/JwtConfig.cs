using System;
namespace Stockers.API.Utilities
{
	public class JwtConfig
	{
        public string Secret { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        // Add other configuration properties as needed

        public JwtConfig()
		{

		}
	}
}

