import { RootState } from "@/utils/store";
import { useDispatch, useSelector } from "react-redux";
//@ts-ignore
import { UilTimes } from "@iconscout/react-unicons";

//REDUCER ACTIONS
import { closeBanner } from "@/utils/reducers/errorReducer";

const Alerts = () => {
  const errorState = useSelector((state: RootState) => state.alerts);
  const { bannerType, message, show } = errorState;
  const dispatch = useDispatch();

  return show ? (
    <div
      className={
        bannerType === "Success"
          ? "alert_banner_success"
          : bannerType === "Error"
          ? "alert_banner_error"
          : bannerType === "Info"
          ? "alert_banner_info"
          : bannerType === "Warning"
          ? "alert_banner_warning"
          : ""
      }
      role="alert"
    >
      <div className="flex">
        <div className="flex-grow">
          <p className="font-bold">Error!</p>
          <p className="text-sm">{message}</p>
        </div>
        <div className="py-1">
          <button
            className="h-6 w-6 ml-8"
            onClick={() => dispatch(closeBanner())}
          >
            <UilTimes
              className={
                bannerType === "Success"
                  ? "text-green-900"
                  : bannerType === "Error"
                  ? "text-red-900"
                  : bannerType === "Info"
                  ? "text-blue-900"
                  : bannerType === "Warning"
                  ? "text-orange-900"
                  : ""
              }
            />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Alerts;
