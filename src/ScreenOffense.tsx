import * as React from "react";
import { useHistory } from "react-router-dom";
import { Type, typesFromString } from "./data";
import * as Matchups from "./Matchups";
import MultiTypeSelector from "./MultiTypeSelector";
import { useSearch } from "./useSearch";

interface OffenseProps {
  setOffenseParams: (params: string) => void;
}

export default function ScreenOffense(props: OffenseProps) {
  const search = useSearch();
  const history = useHistory();
  const offenseTypes = typesFromString(search.get("types") || "");

  function createParams(types: Type[]): string {
    const params = new URLSearchParams();
    if (types.length > 0) {
      params.set("types", types.join(" "));
    }
    return "?" + params;
  }

  const updateOffenseTypes = (types: Type[]) => {
    history.replace({ search: createParams(types) });
  };

  const params = createParams(offenseTypes);
  React.useEffect(() => {
    props.setOffenseParams(params);
  }, [params]);

  const classH2 = "tc f5 mv3";
  return (
    <main className="ph3 pt1 pb4 content-wide center">
      <div className="dib w-50-ns w-100 v-top">
        <h2 className={classH2}>Choose Types</h2>
        <MultiTypeSelector value={offenseTypes} onChange={updateOffenseTypes} />
      </div>
      <div className="dib w-50-ns w-100 v-top pl3-ns">
        <hr className="dn-ns subtle-hr mv4" />
        <Matchups.Offense types={offenseTypes} />
      </div>
    </main>
  );
}

ScreenOffense.displayName = "ScreenOffense";
