import { InitialStateProps } from "./AppManageState";
import { TYPES } from "./actionTypes";
import { putProductNameDescription } from "../utils/api";

export type TAction = {
  payload?: any;
  type: TYPES;
};

const headers = {
  Authorization: "Basic " + btoa("test@liferay.com:test"),
  "Content-Type": "application/json",
};

export function appReducer(state: InitialStateProps, action: TAction) {
  switch (action.type) {
    case TYPES.SUBMIT_APP: {
      return state;
    }
    case TYPES.SUBMIT_APP_BUILD: {
      return state;
    }
    case TYPES.SUBMIT_APP_LICENSING: {
      return state;
    }
    case TYPES.SUBMIT_APP_PROFILE: {
      const { appDescription, appLogo, appName, categories, tags } = action.payload;
	  console.log(categories);
	  console.log(tags);

      const makeRequest = async () => {
        const appNameDescription = await putProductNameDescription({
          appDescription,
          appName,
        });

		const response = await appNameDescription.json();

		const {externalReferenceCode, productId} = response;

    const addLogo = fetch(
      `http://localhost:8080/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}
      patchProductByExternalReferenceCode`,
      {
        body: JSON.stringify({
          active: true,
          catalogId: 40716,
          description: { en_US: appDescription },
          name: { en_US: appName },
          productType: "simple",
        }),
        headers,
        method: "POST",
      }
    );

    

  }
  

    



		

		

        // const appCategoriesTags: any = await putProductCategoriesTags({
		// 	categories,
        // });

        if (appNameDescription.ok) {
          return {
            ...state,
            appId: response.productId,
            appERC: response.externalReferenceCode,
            appWorkflowStatusInfo: response.workflowStatusInfo,
          };
        }
      };
      makeRequest();
    }
    case TYPES.SUBMIT_APP_STOREFRONT: {
      return state;
    }
    case TYPES.SUBMIT_APP_SUPPORT: {
      return state;
    }
    case TYPES.SUBMIT_APP_VERSION: {
      return state;
    }
    case TYPES.UPDATE_APP_CATEGORIES: {
		const appCategories = action.payload.value;

		return { ...state, appCategories};
    }
    case TYPES.UPDATE_APP_DESCRIPTION: {
      const appDescription = action.payload.value;

      return { ...state, appDescription };
    }
    case TYPES.UPDATE_APP_DOCUMENTATION_URL: {
      return state;
    }
    case TYPES.UPDATE_APP_INSTALLATION_AND_UNINSTALLATION_GUIDE_URL: {
      return state;
    }
    case TYPES.UPDATE_APP_LICENSE: {
      return state;
    }
    case TYPES.UPDATE_APP_LICENSE_PRICE: {
      return state;
    }
    case TYPES.UPDATE_APP_LOGO: {
      const appLogo = action.payload.file;

      return { ...state, appLogo };
    }
    case TYPES.UPLOAD_APP_LPKG: {
      return state;
    }
    case TYPES.UPDATE_APP_LXC_COMPATIBILITY: {
		putProductSpecification
      return state;
    }
    case TYPES.UPDATE_APP_NAME: {
      const appName = action.payload.value;

      return { ...state, appName };
    }
    case TYPES.UPDATE_APP_NOTES: {
      return state;
    }
    case TYPES.UPDATE_APP_PRICE_MODEL: {
      return state;
    }
    case TYPES.UPDATE_APP_PUBLISHER_WEBSITE_URL: {
      return state;
    }
    case TYPES.UPLOAD_APP_STOREFRONT_IMAGES: {
      return state;
    }
    case TYPES.UPDATE_APP_SUPPORT_URL: {
      return state;
    }
    case TYPES.UPDATE_APP_TAGS: {
      return state;
    }
    case TYPES.UPDATE_APP_TRIAL_INFO: {
      return state;
    }
    case TYPES.UPDATE_APP_USAGE_TERMS_URL: {
      return state;
    }
    case TYPES.UPDATE_APP_VERSION: {
      return state;
    }
    default:
      return state;
  }
}
