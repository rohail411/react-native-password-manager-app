import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

function useScreenFocus(callback, depArray = []) {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      callback();
    }
  }, [isFocused, ...depArray]);
}

export default useScreenFocus;
