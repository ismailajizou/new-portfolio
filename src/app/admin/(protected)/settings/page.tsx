import { saveSettings } from "@/app/_actions/cms";
import { SETTINGS_FIELDS } from "@/cms/collections";
import { EntryForm } from "@/components/admin/entry-form";
import { AdminPageHeader } from "@/components/admin/page-header";
import { getSettings } from "@/server/cms/queries";

const Page = async () => {
  const settings = await getSettings();
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
      <AdminPageHeader
        title="Site settings"
        description="Your name, the opening, the about text, contact links and what search engines show."
      />
      <EntryForm
        groups={SETTINGS_FIELDS}
        initial={settings}
        action={saveSettings}
      />
    </div>
  );
};
export default Page;
