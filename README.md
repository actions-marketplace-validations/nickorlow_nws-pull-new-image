# NWS Pull New Image (NWSDeploy)

Gets the NWS network to pull a new version of the docker image used to host your application.

## How to Use

### 1. Dockerize your Application
Since NWS uses Kubernetes, it is necessary to dockerize your application (other container formats like containerd haven't been tested with NWS). Doing this will vary on your application although it is easy to find templates via google.

### 2. Create a GitHub Actions Pipeline to Build your Application
You can find an example GitHub Acitons script [here](https://github.com/nickorlow/docker-helloworld-http/blob/master/.github/workflows/docker-publish.yml). 

### 3. Get NWS Credentials
In order to deploy to NWS, you need to get credentials. Currently, NWS is invite-only and to get credentials, you need to recieve an invitation. 

When you do get credentials, you will recieve the following two keys: an applicationId and a deploymentKey.

#### 4. Add NWS Credentials to GitHub
First, you need to add this to your github actions file (if you haven't already):

```yaml 
 - name: NWS Pull New Image
        uses: nickorlow/nws-pull-new-image@v1.0
        with:
          deploy-key: ${{ secrets.NWS_DEPLOY_KEY }}
          application-id: ${{ secrets.NWS_APPLICATION_ID }}
```

You then need to add the secrets to your GitHub repo. You do this by going to the `Settings` tab in the repository and then selecting `Secrets > Actions` from the lefthand panel. From here press `New Repository` secret and add your secrets. 

### 5. Run your pipeline
Running your pipeline will deploy the latest version of NWS. This process currently can take up to 5 minutes. If it takes longer than 10 minutes, then contact @nickorlow.

### 6. Forward your application's DNS to NWS
Go to your website's DNS management website (I highly reccomend using Cloudflare for this). Then create a CNAME from your desired domain name which points to `entry.nws.nickorlow.com`. If you require SSL (and you aren't able to use Cloudflare's Flexible SSL option) then contact @nickorlow.

---
