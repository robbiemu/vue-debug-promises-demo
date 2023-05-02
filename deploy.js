const {deployNodeJS} = require("@azure/api-management-custom-widgets-tools")

const serviceInformation = {
	"resourceId": "subscriptions/9dd76f4a-3f5b-45fb-8f36-81a5e0971bed/resourceGroups/dev-apiops/providers/Microsoft.ApiManagement/service/dev-apim-apiops",
	"managementApiEndpoint": "https://management.azure.com"
}
const name = "testwithvue"
const fallbackConfigPath = "./static/config.msapim.json"

deployNodeJS(serviceInformation, name, fallbackConfigPath)
