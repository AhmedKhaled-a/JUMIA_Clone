import React from "react";
import { useTranslation } from "react-i18next";
const ShippingReturns = (props) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <p>{t("shipping.title")}</p>
      <ul>
        <li>{t("shipping.details")}</li>
        <li>{t("shipping.details1")}</li>
      </ul>
      <p>{t("shipping.body")}</p>
      <p>{t("shipping.footer")}</p>
    </React.Fragment>
  );
};

export default ShippingReturns;
