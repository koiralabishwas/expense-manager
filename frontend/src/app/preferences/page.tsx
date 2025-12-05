import { getPreferences } from "../actions/preference.server";

export default async function PreferencePage() {
  const preferences = await getPreferences();
  console.log(preferences)
  return (
    <div>
      Hello world
    </div>
  )
}
