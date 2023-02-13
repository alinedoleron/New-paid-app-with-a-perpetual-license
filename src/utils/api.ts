type LocalizedValue = {
  ar_SA?: string | undefined;
  ca_ES?: string | undefined;
  de_DE?: string | undefined;
  en_US?: string | undefined;
  es_ES?: string | undefined;
  fi_FI?: string | undefined;
  fr_FR?: string | undefined;
  zh_CN?: string | undefined;
};

type product = {
  active: boolean;
  catalogId: number;
  description?: LocalizedValue;
  name: LocalizedValue;
  productType: string;
};

const headers = {
  Authorization: "Basic " + btoa("test@liferay.com:test"),
  "Content-Type": "application/json",
};

export function putProductNameDescription({
  appDescription,
  appName,
}: {
  appDescription: string;
  appName: string;
}) {
  return  fetch(
    `http://localhost:8080/o/headless-commerce-admin-catalog/v1.0/products`,
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

export  function putProductCategoriesTags({
  appDescription,
  appName,
}: {
  appDescription: string;
  appName: string;
}) {
  return  fetch(
    `http://localhost:8080/o/headless-admin-taxonomy/v1.0/sites/${1}/keywords`,
    {
      body: JSON.stringify({
        active: true,
        catalogId: 40716,
        productType: "simple",
      }),
      headers,
      method: "POST",
    }
  );
}

export async function putProductSpecification({
  id,
  specificationKey,
  value,
}: {
  id: string;
  specificationKey: string;
  value: LocalizedValue;
}) {
  return await fetch(
    `http://localhost:8080/o/headless-commerce-admin-catalog/v1.0/products/sd/productSpecifications`,
    {
      body: JSON.stringify({
        id,
        specificationKey,
        value
      }),
      headers,
      method: "POST",
    }
  );
}
