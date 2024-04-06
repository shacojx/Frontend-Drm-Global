# React SPA for DRM Global

## Environment Requirements
### Local Machine
1. Node >= 18.17
2. Logged in to Git and can pull and push source code

### Server
1. Logged in to Git and can pull source code
2. Navigate to /var/www/ and create directories for release code:

```sh
cd /var/www/
mkdir drm
cd drm
mkdir landing
mkdir cms
mkdir customer
```

## Build Landing Page
### Local
Open a terminal, navigate to the FEDrmGlobal project, and run the command:
```sh
sh deploy_landing_page.sh
```

### Server
Navigate to the FEDrmGlobal project and run the command:
```sh
sh release_landing_page.sh
```

If an error occurs, you can roll back with the command:
```sh
sh rollback_landing_page.sh
```

## Build Customer Page
### Local

Open a terminal, navigate to the FEDrmGlobal project, and run the command:
```sh
sh deploy_customer_page.sh
```

### Server

Navigate to the FEDrmGlobal project and run the command:
```sh
sh release_customer_page.sh
```

If an error occurs, you can roll back with the command:
```sh
sh rollback_customer_page.sh
```

## Build CMS Page
### Local

Open a terminal, navigate to the FEDrmGlobal project, and run the command:
```sh
sh deploy_cms_page.sh
```

### Server

Navigate to the FEDrmGlobal project and run the command:
```sh
sh release_cms_page.sh
```

If an error occurs, you can roll back with the command:
```sh
sh rollback_cms_page.sh
```

## Appendix 1

You can use Nginx or any other application to serve the builds in the /var/www/drm directory.

- Landing page source: /var/www/drm/landing
- CMS page source: /var/www/drm/cms
- Customer page source: /var/www/drm/customer

## Appendix 2

Serving files and folders is related to permissions on the server. Check and add permissions accordingly.
