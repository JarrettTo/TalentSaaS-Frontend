import { NumberInput, Tooltip } from "@mantine/core";
import { IMAGES_URL } from "@shared/constants/variables";
import { roundNumberTo2 } from "@shared/lib/utils";
import clsx from "clsx";
import { Link } from "react-router-dom";
import verifiedImage from "@shared/icons/verify-icon.svg";
import { IPlacementLastLog, IRatesPlacement } from "@entities/placement/lib/interfaces";
import { PlacementDictionary, checkIfPlatformConnected } from "@entities/placement";

const cellClasses = "px-3 py-3";

type RatesRow = {
  ratesPlacement: IRatesPlacement;
  placementsLastLogs?: IPlacementLastLog[];
  disabled: boolean;
  onTalentFeeUpdate: (quotePlacementId: number, talentFee: number) => void;
  onBoostingUpdate: (quotePlacementId: number, boosting: number) => void;
};

export const RatesRow = (props: RatesRow) => {
  const {
    ratesPlacement,
    placementsLastLogs,
    disabled,
    onTalentFeeUpdate,
    onBoostingUpdate,
  } = props;

  const talentFeeLog = placementsLastLogs?.find(
    (placementLastLog) => !!placementLastLog.talantFee
  );
  const boostingLog = placementsLastLogs?.find(
    (placementLastLog) => !!placementLastLog.boosting
  );

  return (
    <div className="grid grid-cols-[auto_1fr] items-center">
      <div className={clsx(cellClasses, "w-44 flex items-center flex-shrink-0")}>
        <div className="relative w-1/5 h-0 pt-[20%] min-w-[20%] bg-slate-300 rounded-full mr-4 overflow-hidden">
          {ratesPlacement.influencer.avatar != null && (
            <img
              className="absolute top-0 left-0 w-full h-full object-cover"
              src={`${IMAGES_URL}/avatars/${ratesPlacement.influencer.avatar}`}
              alt=""
            />
          )}
        </div>
        <Link
          to={`/app/influencer/insights/${ratesPlacement.influencer.id}/youtube`}
          className="text-black h-fit truncate no-underline hover:text-orange"
        >
          {`${ratesPlacement.influencer.firstname} ${ratesPlacement.influencer.lastname}`}
        </Link>
      </div>
      <div className="flex overflow-auto">
      <div className="grid grid-cols-[repeat(11,_minmax(0,_1fr))]">
      <div className={clsx(cellClasses, "w-44 flex items-center pl-10")}>
        <p>{PlacementDictionary[ratesPlacement.type]}</p>
        {checkIfPlatformConnected(ratesPlacement.type, ratesPlacement.influencer) && (
          <img className="w-4 h-4 ml-2" src={verifiedImage} alt="" />
        )}
      </div>
      <div className={clsx(cellClasses, "w-44 flex items-center gap-2")}>
        {talentFeeLog && !ratesPlacement.shouldUpdate ? (
          <Tooltip
            label={
              <div>
                <p>
                  Updated by {talentFeeLog.manager?.email} at{" "}
                  {new Date(talentFeeLog.createdAt || "").toLocaleDateString()}
                </p>
              </div>
            }
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 7.75C11.3787 7.75 10.875 8.25368 10.875 8.875C10.875 9.28921 10.5392 9.625 10.125 9.625C9.71079 9.625 9.375 9.28921 9.375 8.875C9.375 7.42525 10.5503 6.25 12 6.25C13.4497 6.25 14.625 7.42525 14.625 8.875C14.625 9.83834 14.1056 10.6796 13.3353 11.1354C13.1385 11.2518 12.9761 11.3789 12.8703 11.5036C12.7675 11.6246 12.75 11.7036 12.75 11.75V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V11.75C11.25 11.2441 11.4715 10.8336 11.7266 10.533C11.9786 10.236 12.2929 10.0092 12.5715 9.84439C12.9044 9.64739 13.125 9.28655 13.125 8.875C13.125 8.25368 12.6213 7.75 12 7.75ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                  fill="#1C274C"
                ></path>{" "}
              </g>
            </svg>
          </Tooltip>
        ) : (
          <div className="w-5" />
        )}
        <NumberInput
          value={Number(ratesPlacement.talantFee || 0)}
          min={0}
          disabled={disabled}
          onChange={(value) => {
            onTalentFeeUpdate(ratesPlacement.id, value || 0);
          }}
        />
      </div>
      <div className={clsx(cellClasses, "w-44 overflow-hidden text-ellipsis")}>
        <p>
          $
          {ratesPlacement.talantFee
            ? roundNumberTo2(Number(ratesPlacement.talantFee) * 0.11).toLocaleString('en-US')
            : 0}
        </p>
      </div>
      <div className={clsx(cellClasses, "w-44 overflow-hidden text-ellipsis")}>
        <p>
          $
          {ratesPlacement.talantFee
            ? roundNumberTo2(Number(ratesPlacement.talantFee) * 0.2).toLocaleString('en-US')
            : 0}
        </p>
      </div>
      <div className={clsx(cellClasses, "w-44 overflow-hidden text-ellipsis")}>
        <p>{Number(ratesPlacement.totalImpressionsByCurrentMonth).toLocaleString('en-US') ?? "-"}</p>
      </div>
      <div className={clsx(cellClasses, "w-44 overflow-hidden text-ellipsis")}>
        <p>{(Number(ratesPlacement.AUorNZAuditory)).toLocaleString('en-US') ?? "-"}</p>
      </div>
      <div className={clsx(cellClasses, "w-44 overflow-hidden text-ellipsis")}>
        <p>{(Number(ratesPlacement.westAuditory)/2).toLocaleString('en-US') ?? "-"}</p>
      </div>
      <div className={clsx(cellClasses, "w-44 overflow-hidden text-ellipsis")}>
        <p>{(Number(ratesPlacement.AUorNZAuditory)+Number(ratesPlacement.westAuditory)/2).toLocaleString('en-US') ?? "-"}</p>
      </div>
      <div className={clsx(cellClasses, "w-44 overflow-hidden text-ellipsis")}>
        <p>{ratesPlacement.priceInUSD ?? "-"}</p>
      </div>
      <div className={clsx(cellClasses, "w-44 overflow-hidden text-ellipsis")}>
        <p>{ratesPlacement.priceInAUD ?? "-"}</p>
      </div>
      <div className={clsx(cellClasses, "w-44 flex items-center gap-2")}>
        {boostingLog && !ratesPlacement.shouldUpdate ? (
          <Tooltip
            label={
              <div>
                <p>
                  Updated by {boostingLog.manager?.email} at{" "}
                  {new Date(boostingLog.createdAt || "").toLocaleDateString()}
                </p>
              </div>
            }
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 7.75C11.3787 7.75 10.875 8.25368 10.875 8.875C10.875 9.28921 10.5392 9.625 10.125 9.625C9.71079 9.625 9.375 9.28921 9.375 8.875C9.375 7.42525 10.5503 6.25 12 6.25C13.4497 6.25 14.625 7.42525 14.625 8.875C14.625 9.83834 14.1056 10.6796 13.3353 11.1354C13.1385 11.2518 12.9761 11.3789 12.8703 11.5036C12.7675 11.6246 12.75 11.7036 12.75 11.75V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V11.75C11.25 11.2441 11.4715 10.8336 11.7266 10.533C11.9786 10.236 12.2929 10.0092 12.5715 9.84439C12.9044 9.64739 13.125 9.28655 13.125 8.875C13.125 8.25368 12.6213 7.75 12 7.75ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                  fill="#1C274C"
                ></path>{" "}
              </g>
            </svg>
          </Tooltip>
        ) : (
          <div className="w-5" />
        )}
        <NumberInput
          value={Number(ratesPlacement.boosting ?? 0)}
          min={0}
          disabled={disabled}
          onChange={(value) => {
            onBoostingUpdate(ratesPlacement.id, value || 0);
          }}
        />
      
      </div>
      
      </div>
      </div>
    </div>
  );
};
