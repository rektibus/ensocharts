import { Component, createSignal, For, Show } from 'solid-js';

import { Modal, List } from '../../component';

import i18n from '../../i18n';

export type IndicatorPlacement = 'main' | 'sub' | 'both';

export interface IndicatorEntry {
  name: string;
  label: string;
  category: string;
  placement: IndicatorPlacement;
}

type OnIndicatorChange = (params: {
  name: string;
  paneId: string;
  added: boolean;
}) => void;

export interface IndicatorModalProps {
  locale: string;
  mainIndicators: string[];
  subIndicators: object;
  customIndicators?: IndicatorEntry[];
  onMainIndicatorChange: OnIndicatorChange;
  onSubIndicatorChange: OnIndicatorChange;
  onClose: () => void;
}

// Built-in indicator catalog with placement metadata
const BUILTIN_INDICATORS: IndicatorEntry[] = [
  // Trend — can overlay on chart or go in sub-pane
  { name: 'MA', label: 'MA', category: 'trend', placement: 'both' },
  { name: 'EMA', label: 'EMA', category: 'trend', placement: 'both' },
  { name: 'SMA', label: 'SMA', category: 'trend', placement: 'both' },
  { name: 'BOLL', label: 'Bollinger Bands', category: 'trend', placement: 'both' },
  { name: 'SAR', label: 'Parabolic SAR', category: 'trend', placement: 'main' },
  { name: 'BBI', label: 'BBI', category: 'trend', placement: 'both' },

  // Volume
  { name: 'candle_volume', label: 'Volume (overlay)', category: 'volume', placement: 'main' },
  { name: 'VOL', label: 'Volume', category: 'volume', placement: 'sub' },

  // Oscillators — sub-pane only
  { name: 'MACD', label: 'MACD', category: 'oscillator', placement: 'sub' },
  { name: 'KDJ', label: 'KDJ', category: 'oscillator', placement: 'sub' },
  { name: 'RSI', label: 'RSI', category: 'oscillator', placement: 'sub' },
  { name: 'BIAS', label: 'BIAS', category: 'oscillator', placement: 'sub' },
  { name: 'BRAR', label: 'BRAR', category: 'oscillator', placement: 'sub' },
  { name: 'CCI', label: 'CCI', category: 'oscillator', placement: 'sub' },
  { name: 'DMI', label: 'DMI', category: 'oscillator', placement: 'sub' },
  { name: 'CR', label: 'CR', category: 'oscillator', placement: 'sub' },
  { name: 'PSY', label: 'PSY', category: 'oscillator', placement: 'sub' },
  { name: 'DMA', label: 'DMA', category: 'oscillator', placement: 'sub' },
  { name: 'TRIX', label: 'TRIX', category: 'oscillator', placement: 'sub' },
  { name: 'OBV', label: 'OBV', category: 'oscillator', placement: 'sub' },
  { name: 'VR', label: 'VR', category: 'oscillator', placement: 'sub' },
  { name: 'WR', label: 'WR', category: 'oscillator', placement: 'sub' },
  { name: 'MTM', label: 'MTM', category: 'oscillator', placement: 'sub' },
  { name: 'EMV', label: 'EMV', category: 'oscillator', placement: 'sub' },
  { name: 'ROC', label: 'ROC', category: 'oscillator', placement: 'sub' },
  { name: 'PVT', label: 'PVT', category: 'oscillator', placement: 'sub' },
  { name: 'AO', label: 'AO', category: 'oscillator', placement: 'sub' },
];

// Category display order and labels
const CATEGORY_ORDER = ['trend', 'volume', 'oscillator', 'engine', 'wasm', 'script'];
const CATEGORY_LABELS: Record<string, string> = {
  trend: 'Trend',
  volume: 'Volume',
  oscillator: 'Oscillators',
  engine: 'Engine',
  wasm: 'WASM',
  script: 'Scripts',
};

const IndicatorModal: Component<IndicatorModalProps> = (props) => {
  const [search, setSearch] = createSignal('');

  // Merge built-in + custom indicators
  const allIndicators = () => {
    const custom = props.customIndicators ?? [];
    return [...BUILTIN_INDICATORS, ...custom];
  };

  // Group by category, filter by search
  const groupedIndicators = () => {
    const query = search().toLowerCase();
    const groups: Record<string, IndicatorEntry[]> = {};

    allIndicators().forEach((ind) => {
      if (query && !ind.label.toLowerCase().includes(query) && !ind.name.toLowerCase().includes(query)) {
        return;
      }
      if (!groups[ind.category]) {
        groups[ind.category] = [];
      }
      groups[ind.category].push(ind);
    });

    // Return in display order
    return CATEGORY_ORDER
      .filter((cat) => groups[cat] && groups[cat].length > 0)
      .map((cat) => ({ category: cat, label: CATEGORY_LABELS[cat] ?? cat, indicators: groups[cat] }));
  };

  const isOnMain = (name: string) => props.mainIndicators.includes(name);
  const isOnSub = (name: string) => name in props.subIndicators;

  return (
    <Modal
      title={i18n('indicator', props.locale)}
      width={420}
      onClose={props.onClose}
    >
      {/* Search filter */}
      <div class="ensocharts-indicator-search" style={{
        padding: '8px 12px',
        'border-bottom': '1px solid rgba(255,255,255,0.06)',
      }}>
        <input
          type="text"
          placeholder="Search indicators..."
          value={search()}
          onInput={(e) => setSearch(e.currentTarget.value)}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            'border-radius': '4px',
            padding: '6px 10px',
            color: 'rgba(255,255,255,0.9)',
            'font-size': '12px',
            outline: 'none',
          }}
        />
      </div>

      <List class="ensocharts-indicator-modal-list" style={{ 'max-height': '400px', 'overflow-y': 'auto' }}>
        <For each={groupedIndicators()}>
          {(group) => (
            <>
              <li class="title">{group.label}</li>
              <For each={group.indicators}>
                {(ind) => {
                  const onMain = isOnMain(ind.name);
                  const onSub = isOnSub(ind.name);
                  const canMain = ind.placement === 'main' || ind.placement === 'both';
                  const canSub = ind.placement === 'sub' || ind.placement === 'both';

                  return (
                    <li class="row" style={{
                      display: 'flex',
                      'align-items': 'center',
                      'justify-content': 'space-between',
                      padding: '4px 12px',
                      cursor: 'default',
                    }}>
                      {/* Indicator name */}
                      <span style={{
                        color: (onMain || onSub) ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)',
                        'font-size': '12px',
                        flex: '1',
                        'min-width': '0',
                        overflow: 'hidden',
                        'text-overflow': 'ellipsis',
                        'white-space': 'nowrap',
                      }}>
                        {ind.label}
                        <Show when={onMain || onSub}>
                          <span style={{
                            'margin-left': '6px',
                            'font-size': '9px',
                            color: '#10b981',
                            'font-weight': '600',
                          }}>●</span>
                        </Show>
                      </span>

                      {/* Action buttons */}
                      <div style={{ display: 'flex', gap: '4px', 'flex-shrink': '0' }}>
                        {/* Add to chart (overlay) */}
                        <Show when={canMain}>
                          <button
                            title={onMain ? 'Remove from chart' : 'Add to chart'}
                            onClick={() => {
                              props.onMainIndicatorChange({
                                name: ind.name,
                                paneId: 'candle_pane',
                                added: !onMain,
                              });
                            }}
                            style={{
                              background: onMain ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.04)',
                              border: onMain ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.08)',
                              'border-radius': '3px',
                              color: onMain ? '#10b981' : 'rgba(255,255,255,0.5)',
                              cursor: 'pointer',
                              padding: '3px 6px',
                              'font-size': '10px',
                              'line-height': '1',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
                            </svg>
                          </button>
                        </Show>

                        {/* Add as sub-pane */}
                        <Show when={canSub}>
                          <button
                            title={onSub ? 'Remove sub-pane' : 'Add as sub-pane'}
                            onClick={() => {
                              props.onSubIndicatorChange({
                                name: ind.name,
                                paneId: (props.subIndicators as any)[ind.name] ?? '',
                                added: !onSub,
                              });
                            }}
                            style={{
                              background: onSub ? 'rgba(79,70,229,0.15)' : 'rgba(255,255,255,0.04)',
                              border: onSub ? '1px solid rgba(79,70,229,0.3)' : '1px solid rgba(255,255,255,0.08)',
                              'border-radius': '3px',
                              color: onSub ? '#6366f1' : 'rgba(255,255,255,0.5)',
                              cursor: 'pointer',
                              padding: '3px 6px',
                              'font-size': '10px',
                              'line-height': '1',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M3 3v18h18V3H3zm8 16H5V5h6v14zm10 0h-8V5h8v14z" />
                            </svg>
                          </button>
                        </Show>
                      </div>
                    </li>
                  );
                }}
              </For>
            </>
          )}
        </For>
      </List>
    </Modal>
  );
};

export default IndicatorModal;
