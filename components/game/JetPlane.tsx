import { motion } from "framer-motion";
import { Player } from "../../hooks/useGameEngine";

interface JetPlaneProps {
  player: Player;
}

export function JetPlane({ player }: JetPlaneProps) {
  return (
    <div
      className="absolute z-10"
      style={{
        left: `${player.x}px`,
        top: `${player.y}px`,
        transform: `rotate(${player.rotation}deg)`,
      }}
    >
      <motion.div
        className="relative"
        animate={{
          rotate: player.bikeTilt, // Reusing for barrel roll tilt
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* Jet Plane Image */}
        <motion.div
          className="relative w-32 h-32"
          animate={{
            scale: player.isJumping ? 1.15 : 1, // Boost effect
            y: player.isGrinding ? [0, -3, 0] : 0, // Reusing for turbulence
          }}
          transition={{
            duration: 0.2,
            repeat: player.isGrinding ? Infinity : 0,
          }}
        >
          {/* Jet plane - simplified for performance */}
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{
              filter: player.isGrinding
                ? "brightness(1.3) drop-shadow(0 0 15px rgba(0,200,255,0.8))"
                : "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
              transition: "filter 0.2s ease",
            }}
          >
            <svg viewBox="0 0 1536 1024" className="w-full h-full">
              <g>
                <path d="M57,595.366C134.158,625.378 216.748,639.655 330,631C321.064,627.904 322.904,558.88 326,551C336.169,525.122 68.871,582.46 57,595.366Z" fill="rgb(255,0,0)"/>
                <path d="M325.047,617.442C322.366,604.418 322.154,586.143 324.252,563.562C277.842,568.488 231.663,574.399 188,591C235.456,607.794 280.341,613.023 325.047,617.442Z" fill="rgb(255,134,28)" stroke="rgb(241,222,0)" strokeWidth="1"/>
                <g transform="matrix(1,0,0,1,-208,-151)">
                  <path d="M593.486,480.007L655.558,480.007C661.162,479.634 664.586,481.469 669,485C673.58,488.663 765.393,593.194 817,654L939,640C979.876,637.119 1042.6,620.8 1087,610C1133.83,598.608 1166.22,593.979 1185,588C1277.59,558.516 1352.4,567.903 1435,643C1435,643 1439.62,648.219 1444,649C1527.94,663.974 1687,725 1687,725C1687,725 1625.6,744.976 1512.52,756.34C1465.9,761.024 1410.5,764.245 1347,764C1303.95,763.834 1278.55,770.937 1267,776C1255.45,781.063 1226.89,801.738 1182,801C1137.11,800.262 924,797 924,797C926.251,796 837.343,818.779 789.77,838.937C775.45,845.005 746.284,846.028 688,845L751,793L669,793L603,831L498,833L578,773C561.701,769.528 539.28,794.418 533,775C531.704,714.38 524.036,697.03 546,694C571.313,690.509 596.036,710.695 600,689C600,689 597.133,672.61 631.676,670.287L643,669L639,654L593.486,480.007Z"/>
                </g>
                <path d="M1312,601C1303.97,574.44 1303.1,552.396 1313.84,522.422C1290.47,516.241 1259.31,505.495 1235.5,501.432C1235.5,501.432 1223.77,506.996 1218,508C1205.34,510.201 1165.55,513.529 1076,501C1045.43,496.723 1012,478 1012,478C997.664,465.782 983.402,452.152 974.639,441.422C974.639,441.422 876.239,465.967 844,472C802.186,482.73 759.649,493.306 699,500L610,509L438,521C438,521 411.64,523.761 407,526C402.36,528.239 409,530 409,530C409,530 397.464,525.473 396,538C395.402,543.119 396,601 396,601C396,601 524.444,584.773 571,581C617.556,577.227 608.944,572.273 638,569C667.056,565.727 737.944,548.773 853,553C946.201,556.424 929.966,557.072 945,558C961.524,559.02 978,564 978,564C883.62,597.425 816.252,616.584 725.09,642.752L946.591,645.875C946.591,645.875 992.722,650.934 1040.91,629.152C1041.88,628.714 1056.89,621.619 1064.63,618.187C1083.22,609.94 1143.91,607.779 1161,607C1171.61,606.516 1279,604.853 1312,601Z" fill="rgb(51,60,71)"/>
                <path d="M413,525L440,522L610,509C610,509 747.934,494.735 799,483C850.066,471.265 970,443 970,443C970,443 974.983,452.179 981,457L794,498C794,498 724.387,515.612 615,525C505.613,534.388 428,539 428,539C417.408,539.573 416.051,539.996 410.52,540.843C404.525,541.76 401.433,543.298 396,548L396,538C396,538 396.892,527.863 413,525Z" fill="rgb(34,44,53)"/>
                <path d="M977,441C989.667,452.735 1001.33,465.65 1015,476C1015,476 1032.91,487.892 1058,494C1083.09,500.108 1086.81,500.962 1146,506C1181.16,508.993 1214.71,506.732 1231,500C1231,500 1197.02,460.129 1125,434C1058.93,410.028 977,441 977,441Z" fill="rgb(33,181,226)"/>
                <path d="M1175.28,500.606C1175.28,500.606 1199.3,500.053 1214.25,498.499C1216.26,498.29 1168.64,460.632 1121,442C1074.9,423.971 1010.8,433.01 985.676,442.954L992.286,449.777C1035.39,433.106 1101.6,438.356 1175.75,501.114" fill="white" fillOpacity="0.3"/>
                <path d="M1319,521C1307.85,546.747 1306.94,573.43 1316,603C1368.32,597.172 1417.86,591.568 1478,575C1423.34,552.564 1370.39,534.698 1319,521Z" fill="rgb(34,43,53)"/>
                <path d="M964,565L605,675C605,675 573.49,689.577 555,690C536.51,690.423 489,692 489,692L631,574C709.514,560.605 744,560 744,560C744,560 847.74,548.952 964,565Z" fill="rgb(51,61,71)"/>
                <path d="M971.618,646.509L727.09,641.752L978,564C978,564 1010.67,562.419 1063,577L873,636L976,639C976,639 1006.79,638.378 1038,621C1071.82,602.172 1086.98,596.19 1111,598C1153.27,601.185 1265.29,592.123 1300,591C1300.71,594.299 1300.99,596.377 1303.02,601.861C1234.98,608.308 1167.84,609.485 1102,611C1101.81,609.867 1070.64,614.915 1051,625C1031.64,634.942 1009.69,647.228 971.618,646.509Z" fill="rgb(33,44,52)"/>
                <path d="M1316,603L1314,588C1364.96,581.812 1419.4,577.365 1478,575C1477.5,580.032 1345.56,601.197 1316,603" fill="rgb(25,34,42)"/>
                <path d="M569.493,625.112L489,692L555,690C572.68,689.295 595.538,680.305 618.72,670.796L720.929,639.479C676.803,622.62 626.952,616.638 569.493,625.112" fill="rgb(248,12,20)"/>
                <path d="M397,605L554,586L396,677L296,680L397,605Z" fill="rgb(51,61,71)"/>
                <path d="M439,517L389,331L436,331C436,331 456.937,328.234 484,363C511.063,397.766 603,505 603,505L439,517Z" fill="rgb(43,53,63)"/>
                <path d="M458,335C453.673,330.406 444.558,331.007 444.558,331.007C433.856,330.392 389.486,331.007 389.486,331.007L392.155,341.235L428,341C428,341 433.297,340.099 440,349C445.862,356.784 560,499 560,499L598.534,499.784L458,335Z" fill="rgb(25,34,43)"/>
                <path d="M561,585C527.013,606.172 506.668,618.575 468.397,640.108L544.985,639.906L623,575C608.504,579.795 576.005,585.645 561,585Z" fill="rgb(33,42,51)"/>
                <path d="M394,539L394,603L387,609L387,551C388.585,550.232 393.272,545.916 394,539Z" fill="rgb(51,60,71)"/>
                <path d="M328,624L326,563C326,563 325.004,550.572 334,547C343.903,543.068 372.155,549.446 376,551L376,616L373.04,618.96C373.04,618.96 367.497,618.135 363,619C358.503,619.865 346.092,624.488 344,626C340.785,628.325 328.973,630.567 328,624Z" fill="rgb(51,60,71)"/>
                <g transform="matrix(1,0,0,1,-9,9)">
                  <path d="M394,542L394,600L387,606L387,543C388.447,544.405 392.06,543.642 394,542Z" fill="rgb(51,60,71)"/>
                </g>
              </g>
            </svg>
          </div>
        </motion.div>

        {/* Engine trail/exhaust */}
        {Math.abs(player.velocityX) > 2 && (
          <motion.div
            className="absolute -left-12 top-1/2 -translate-y-1/2"
            animate={{
              opacity: [0.8, 0.4, 0],
              x: [-10, -30, -50],
              scaleX: [1, 1.5, 2],
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
            }}
          >
            <div className="w-16 h-2 bg-gradient-to-r from-orange-500 via-yellow-400 to-transparent rounded-full blur-sm" />
            <div className="w-12 h-1 bg-gradient-to-r from-red-500 via-orange-400 to-transparent rounded-full blur-sm mt-1" />
          </motion.div>
        )}

        {/* Speed boost effect */}
        {player.isJumping && (
          <motion.div
            className="absolute -left-16 top-1/2 -translate-y-1/2"
            animate={{
              opacity: [1, 0.6, 0],
              x: [-5, -25, -45],
              scaleY: [1, 1.3, 1.5],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
            }}
          >
            <div className="w-20 h-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-transparent rounded-full blur-md" />
            <div className="w-16 h-2 bg-gradient-to-r from-blue-500 via-cyan-300 to-transparent rounded-full blur-md mt-1" />
          </motion.div>
        )}

        {/* Turbulence/near-miss sparks (reusing grinding) */}
        {player.isGrinding && (
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2"
            animate={{
              opacity: [1, 0.7, 1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
            }}
          >
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full blur-sm" />
              <div className="w-2 h-2 bg-blue-400 rounded-full blur-sm" />
              <div className="w-2 h-2 bg-cyan-300 rounded-full blur-sm" />
              <div className="w-1 h-1 bg-white rounded-full blur-sm" />
            </div>
          </motion.div>
        )}

        {/* Altitude change particles */}
        {!player.isGrounded && Math.abs(player.velocityY) > 2 && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              opacity: [0.6, 0.3, 0],
              scale: [0.8, 1.2, 1.5],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
            }}
          >
            <div className="flex gap-2">
              <div className="w-1 h-1 bg-white/60 rounded-full" />
              <div className="w-1 h-1 bg-white/40 rounded-full" />
              <div className="w-1 h-1 bg-white/60 rounded-full" />
            </div>
          </motion.div>
        )}

        {/* Trick score indicator */}
        {player.trickScore > 0 && (
          <motion.div
            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
            animate={{
              y: [0, -15, -30],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 1.2,
            }}
          >
            <div className="text-cyan-400 font-bold text-lg drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">
              +{player.trickScore}
            </div>
          </motion.div>
        )}

        {/* Combo multiplier indicator */}
        {player.comboMultiplier > 1 && (
          <motion.div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
            }}
          >
            <div className="text-yellow-400 font-bold text-sm drop-shadow-lg">
              x{player.comboMultiplier.toFixed(1)}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
