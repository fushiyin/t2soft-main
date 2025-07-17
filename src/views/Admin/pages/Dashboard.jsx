import React from "react";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center mt-10 px-4 md:px-0">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
        {t('admin.dashboard.welcome')}
      </h1>
      <p className="text-gray-500 dark:text-gray-300 text-lg text-center max-w-xl mb-8">
        {t('admin.dashboard.description')}
      </p>
    </div>
  );
}
