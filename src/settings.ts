import { PluginSettingTab, SettingDefinitionItem } from 'obsidian';

export type FocusAfterCloseTab = 'right' | 'left' | 'previous_tab';

const FOCUS_AFTER_CLOSE_TAB_LABELS: Record<FocusAfterCloseTab, string> = {
	right: 'To the right (stock Obsidian behavior)',
	left: 'To the left',
	previous_tab: 'Previous tab',
};

export interface MainTabCommandsSettings {
	focusAfterCloseTab: FocusAfterCloseTab;
	previousTabHistoryLength: number;
	preventClosingPinnedTabs: boolean;
}

export const DEFAULT_SETTINGS: MainTabCommandsSettings = {
	focusAfterCloseTab: 'right',
	previousTabHistoryLength: 1,
	preventClosingPinnedTabs: false,
};

export class MainTabCommandsSettingTab extends PluginSettingTab {
	getSettingDefinitions(): SettingDefinitionItem<keyof MainTabCommandsSettings>[] {
		return [
			{
				name: 'Focus after close tab',
				desc: 'Which tab to focus after the current tab is closed. (Only applies to this plugin\'s "Close current tab in the main area" command, not other ways of closing tabs.)',
				control: {
					type: 'dropdown',
					key: 'focusAfterCloseTab',
					options: FOCUS_AFTER_CLOSE_TAB_LABELS,
				},
			},
			{
				name: 'Previous tab history length',
				desc: 'How many previously focused tabs to remember.',
				visible: () => this.getControlValue('focusAfterCloseTab') === 'previous_tab',
				control: {
					type: 'number',
					key: 'previousTabHistoryLength',
					min: 1,
					max: 100,
					step: 1,
				},
			},
			{
				name: 'Prevent closing pinned tabs',
				desc: 'If enabled, using this plugin\'s "Close current tab in the main area" command on a pinned tab will not close the tab.',
				control: {
					type: 'toggle',
					key: 'preventClosingPinnedTabs',
				},
			},
		];
	}
}
