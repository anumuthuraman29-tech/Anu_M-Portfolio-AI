interface ProjectVisualProps {
  type: 'airbnb' | 'fraud' | 'car' | 'covid';
  compact?: boolean;
}

export function ProjectVisual({ type, compact = false }: ProjectVisualProps) {
  const heightClass = compact ? 'h-48 sm:h-56' : 'h-56 sm:h-64';

  if (type === 'airbnb') {
    return (
      <div
        className={`relative w-full ${heightClass} bg-[#0D0D0D] overflow-hidden flex items-center justify-center p-5 select-none`}
      >
        <svg
          viewBox="0 0 420 230"
          className="w-full h-full"
          role="img"
          aria-label="Airbnb Price Prediction regression and sparse feature imputation workflow diagram"
        >
          {/* Subtle grid */}
          <defs>
            <pattern id="grid-airbnb" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#1E1E1E" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="420" height="230" fill="url(#grid-airbnb)" />

          {/* Header label */}
          <text x="18" y="24" fill="#929292" fontSize="9" fontFamily="monospace" letterSpacing="2">
            REGRESSION PIPELINE · SPARSE IMPUTATION
          </text>
          <line x1="18" y1="32" x2="402" y2="32" stroke="#292929" strokeWidth="1" />

          {/* Left: Missing data matrix schematic */}
          <g transform="translate(18, 48)">
            <text x="0" y="10" fill="#F5F5F5" fontSize="9" fontFamily="sans-serif" fontWeight="600">
              FEATURE MATRIX
            </text>
            {[0, 1, 2, 3, 4].map((row) =>
              [0, 1, 2, 3].map((col) => {
                const isMissing = (row === 1 && col === 2) || (row === 3 && col === 1) || (row === 4 && col === 3);
                return (
                  <rect
                    key={`${row}-${col}`}
                    x={col * 26}
                    y={20 + row * 24}
                    width="20"
                    height="16"
                    fill={isMissing ? '#D20A24' : '#1B1B1B'}
                    stroke={isMissing ? '#D20A24' : '#333333'}
                    strokeWidth="1"
                  />
                );
              })
            )}
            <text x="0" y="152" fill="#929292" fontSize="8" fontFamily="monospace">
              IMPUTED · ENCODED
            </text>
          </g>

          {/* Flow arrow */}
          <path d="M 134 118 L 166 118" stroke="#D20A24" strokeWidth="1.5" />
          <polygon points="166,114 174,118 166,122" fill="#D20A24" />

          {/* Right: Regression scatter + trend curve */}
          <g transform="translate(186, 48)">
            <text x="0" y="10" fill="#F5F5F5" fontSize="9" fontFamily="sans-serif" fontWeight="600">
              PRICE ESTIMATION FIT (RMSE / R²)
            </text>
            <line x1="0" y1="138" x2="212" y2="138" stroke="#3A3A3A" strokeWidth="1" />
            <line x1="0" y1="22" x2="0" y2="138" stroke="#3A3A3A" strokeWidth="1" />

            {/* Conceptual data points */}
            {[
              [22, 122], [38, 110], [54, 114], [72, 95], [88, 86],
              [106, 90], [122, 74], [140, 68], [156, 56], [174, 48], [192, 38],
            ].map(([cx, cy], idx) => (
              <circle
                key={idx}
                cx={cx}
                cy={cy}
                r="3.2"
                fill={idx % 3 === 0 ? '#D20A24' : '#F5F5F5'}
                opacity="0.88"
              />
            ))}

            {/* Fitted regression line */}
            <path
              d="M 12 128 Q 104 82 204 34"
              fill="none"
              stroke="#D20A24"
              strokeWidth="2.2"
            />
            <text x="0" y="152" fill="#929292" fontSize="8" fontFamily="monospace">
              LIGHTGBM · SCIKIT-LEARN REGRESSION
            </text>
          </g>
        </svg>
      </div>
    );
  }

  if (type === 'fraud') {
    return (
      <div
        className={`relative w-full ${heightClass} bg-[#0D0D0D] overflow-hidden flex items-center justify-center p-5 select-none`}
      >
        <svg
          viewBox="0 0 420 230"
          className="w-full h-full"
          role="img"
          aria-label="Credit Card Fraud Detection SMOTE resampling and classifier comparison diagram"
        >
          <defs>
            <pattern id="grid-fraud" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#1E1E1E" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="420" height="230" fill="url(#grid-fraud)" />

          <text x="18" y="24" fill="#929292" fontSize="9" fontFamily="monospace" letterSpacing="2">
            IMBALANCED CLASSIFICATION · SMOTE PIPELINE
          </text>
          <line x1="18" y1="32" x2="402" y2="32" stroke="#292929" strokeWidth="1" />

          {/* Class decision space */}
          <g transform="translate(18, 48)">
            <rect x="0" y="18" width="165" height="122" fill="#131313" stroke="#292929" />
            <text x="0" y="10" fill="#F5F5F5" fontSize="9" fontFamily="sans-serif" fontWeight="600">
              DECISION BOUNDARY
            </text>
            {/* Majority class cluster */}
            {[
              [24, 48], [38, 62], [52, 42], [65, 76], [42, 92], [78, 56],
              [30, 114], [60, 118], [86, 98], [50, 70], [72, 112],
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r="3" fill="#6E6E6E" />
            ))}
            {/* Separating boundary */}
            <path d="M 102 22 C 92 66 122 102 104 136" fill="none" stroke="#D20A24" strokeWidth="2" strokeDasharray="4 3" />
            {/* Minority fraud cluster + SMOTE */}
            {[
              [126, 46], [142, 62], [134, 86], [148, 104], [128, 118],
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r="3.8" fill="#D20A24" />
            ))}
            <text x="0" y="155" fill="#929292" fontSize="8" fontFamily="monospace">
              ROBUSTSCALER + SMOTE TRAIN SPLIT
            </text>
          </g>

          {/* Right: 3-Model Architecture Stack */}
          <g transform="translate(206, 48)">
            <text x="0" y="10" fill="#F5F5F5" fontSize="9" fontFamily="sans-serif" fontWeight="600">
              CLASSIFIER BENCHMARK
            </text>
            {[
              { name: 'NAIVE BAYES', sub: 'Probabilistic Baseline', y: 24 },
              { name: 'DECISION TREES', sub: 'Non-Linear Feature Splits', y: 66 },
              { name: 'LOGISTIC REGRESSION', sub: 'Linear Probability Margin', y: 108 },
            ].map((m) => (
              <g key={m.name} transform={`translate(0, ${m.y})`}>
                <rect x="0" y="0" width="194" height="34" fill="#151515" stroke="#292929" />
                <rect x="0" y="0" width="3" height="34" fill="#D20A24" />
                <text x="12" y="15" fill="#F5F5F5" fontSize="9" fontFamily="sans-serif" fontWeight="600">
                  {m.name}
                </text>
                <text x="12" y="27" fill="#929292" fontSize="8" fontFamily="monospace">
                  {m.sub}
                </text>
              </g>
            ))}
            <text x="0" y="155" fill="#929292" fontSize="8" fontFamily="monospace">
              PRECISION · RECALL · F1-SCORE
            </text>
          </g>
        </svg>
      </div>
    );
  }

  if (type === 'car') {
    return (
      <div
        className={`relative w-full ${heightClass} bg-[#0D0D0D] overflow-hidden flex items-center justify-center p-5 select-none`}
      >
        <svg
          viewBox="0 0 420 230"
          className="w-full h-full"
          role="img"
          aria-label="Car Price Prediction multivariate feature regression schematic"
        >
          <defs>
            <pattern id="grid-car" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#1E1E1E" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="420" height="230" fill="url(#grid-car)" />

          <text x="18" y="24" fill="#929292" fontSize="9" fontFamily="monospace" letterSpacing="2">
            VEHICLE VALUATION · MULTIVARIATE REGRESSION
          </text>
          <line x1="18" y1="32" x2="402" y2="32" stroke="#292929" strokeWidth="1" />

          {/* Feature input nodes */}
          <g transform="translate(18, 50)">
            {[
              { label: 'MODEL YEAR', y: 0 },
              { label: 'MILEAGE / KM', y: 34 },
              { label: 'FUEL TYPE', y: 68 },
              { label: 'TRANSMISSION', y: 102 },
            ].map((feat) => (
              <g key={feat.label} transform={`translate(0, ${feat.y})`}>
                <rect x="0" y="0" width="116" height="26" fill="#151515" stroke="#292929" />
                <text x="10" y="16" fill="#D4D4D4" fontSize="8.5" fontFamily="monospace">
                  {feat.label}
                </text>
                <line x1="116" y1="13" x2="176" y2="64" stroke="#383838" strokeWidth="1.2" />
              </g>
            ))}

            {/* Central regression engine block */}
            <rect x="176" y="34" width="96" height="60" fill="#151515" stroke="#D20A24" strokeWidth="1.5" />
            <text x="224" y="59" textAnchor="middle" fill="#F5F5F5" fontSize="9" fontFamily="sans-serif" fontWeight="600">
              REGRESSION
            </text>
            <text x="224" y="74" textAnchor="middle" fill="#D20A24" fontSize="8" fontFamily="monospace">
              MODEL FIT
            </text>

            <line x1="272" y1="64" x2="306" y2="64" stroke="#D20A24" strokeWidth="1.5" />
            <polygon points="306,60 314,64 306,68" fill="#D20A24" />

            {/* Output target block */}
            <rect x="316" y="34" width="68" height="60" fill="#D20A24" />
            <text x="350" y="60" textAnchor="middle" fill="#F5F5F5" fontSize="8.5" fontFamily="sans-serif" fontWeight="600">
              ESTIMATED
            </text>
            <text x="350" y="74" textAnchor="middle" fill="#F5F5F5" fontSize="9" fontFamily="monospace">
              PRICE
            </text>
          </g>

          <text x="18" y="206" fill="#929292" fontSize="8" fontFamily="monospace">
            ENCODING · FEATURE SCALING · MAE / MSE / RMSE / R²
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${heightClass} bg-[#0D0D0D] overflow-hidden flex items-center justify-center p-5 select-none`}
    >
      <svg
        viewBox="0 0 420 230"
        className="w-full h-full"
        role="img"
        aria-label="COVID-19 Data Analysis temporal trend and exploratory visualization graphic"
      >
        <defs>
          <pattern id="grid-covid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#1E1E1E" strokeWidth="1" />
          </pattern>
          <linearGradient id="covid-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D20A24" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#D20A24" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <rect width="420" height="230" fill="url(#grid-covid)" />

        <text x="18" y="24" fill="#929292" fontSize="9" fontFamily="monospace" letterSpacing="2">
          EXPLORATORY DATA ANALYSIS · TEMPORAL PATTERNS
        </text>
        <line x1="18" y1="32" x2="402" y2="32" stroke="#292929" strokeWidth="1" />

        {/* Trend Area Chart */}
        <g transform="translate(24, 52)">
          <line x1="0" y1="124" x2="372" y2="124" stroke="#3A3A3A" strokeWidth="1" />
          <line x1="0" y1="10" x2="0" y2="124" stroke="#3A3A3A" strokeWidth="1" />

          {/* Background comparative bars */}
          {[22, 42, 62, 82, 102, 122, 142, 162, 182, 202, 222, 242, 262, 282, 302, 322, 342].map(
            (x, idx) => {
              const heights = [18, 28, 42, 64, 52, 36, 48, 86, 104, 82, 58, 44, 62, 74, 48, 30, 22];
              const h = heights[idx] || 30;
              return (
                <rect
                  key={x}
                  x={x}
                  y={124 - h}
                  width="11"
                  height={h}
                  fill="#1C1C1C"
                  stroke="#2E2E2E"
                  strokeWidth="1"
                />
              );
            }
          )}

          {/* Smooth trend line */}
          <path
            d="M 10 112 C 50 96, 72 52, 106 66 C 142 82, 174 18, 208 26 C 242 36, 266 78, 302 52 C 330 34, 348 82, 368 98 L 368 124 L 10 124 Z"
            fill="url(#covid-area)"
          />
          <path
            d="M 10 112 C 50 96, 72 52, 106 66 C 142 82, 174 18, 208 26 C 242 36, 266 78, 302 52 C 330 34, 348 82, 368 98"
            fill="none"
            stroke="#D20A24"
            strokeWidth="2.2"
          />

          <text x="0" y="148" fill="#929292" fontSize="8" fontFamily="monospace">
            PANDAS AGGREGATION · MATPLOTLIB &amp; SEABORN VISUALIZATION
          </text>
        </g>
      </svg>
    </div>
  );
}
