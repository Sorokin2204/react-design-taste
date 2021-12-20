import { RootStateOrAny, TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../redux/root.store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
