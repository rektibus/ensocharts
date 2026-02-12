/**
 * EnsoCharts Pro — DrawingBar component (vanilla TS/DOM, no framework dependency)
 *
 * A vertical toolbar for selecting drawing overlay tools.
 * Renders tool groups with expandable sub-menus.
 */

import { overlayGroups } from './overlays'

/** SVG icon paths for drawing tool categories */
const icons: Record<string, string> = {
    lines: '<path d="M3 17l6-6 4 4L21 7"/>',
    shapes: '<rect x="3" y="3" width="18" height="18" rx="2"/>',
    fibonacci: '<path d="M3 21V9a9 9 0 0 1 9-9h9"/>',
    gann: '<path d="M3 3v18h18"/><path d="M3 21L21 3"/>',
    waves: '<path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/>',
    patterns: '<path d="M3 21l5-5m0 0l4 4m-4-4l4-4m4 4l5-5"/>',
    measure: '<path d="M3 3v18h18"/><path d="M7 17V7h10"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>',
    visible: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    remove: '<path d="M3 6h18M8 6V4h8v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/>'
}

function svgIcon(pathContent: string, size = 18): string {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${pathContent}</svg>`
}

export interface DrawingBarOptions {
    chart: Chart
    onDrawingItemClick?: (name: string) => void
    onModeChange?: (mode: string) => void
    onLockChange?: (locked: boolean) => void
    onVisibleChange?: (visible: boolean) => void
    onRemoveClick?: (groupId?: string) => void
}

export class DrawingBar {
    private _container: HTMLDivElement
    private _activeGroup: string | null = null
    private _submenu: HTMLDivElement | null = null

    constructor(options: DrawingBarOptions) {
        this._container = document.createElement('div')
        this._container.className = 'equicharts-drawing-bar'

        const groups = Object.entries(overlayGroups)
        groups.forEach(([groupName, tools]) => {
            const item = document.createElement('div')
            item.className = 'equicharts-drawing-bar__item'
            item.title = groupName
            item.innerHTML = svgIcon(icons[groupName] ?? icons.lines)

            if (tools.length === 1) {
                item.addEventListener('click', () => {
                    this._setActiveTool(tools[0], item)
                    options.onDrawingItemClick?.(tools[0])
                })
            } else {
                // Has submenu
                const arrow = document.createElement('span')
                arrow.className = 'equicharts-drawing-bar__arrow'
                arrow.innerHTML = '<svg width="6" height="6" viewBox="0 0 4 6"><path d="M1 0.16C0.83-0.05 0.43-0.05 0.18 0.16C-0.06 0.37-0.06 0.72 0.18 0.93L2.61 3.03L0.26 5.07C0.01 5.28 0.01 5.63 0.26 5.84C0.51 6.05 0.9 6.05 1.15 5.84L3.82 3.53C4.02 3.36 4.05 3.09 3.92 2.88C3.93 2.73 3.87 2.58 3.74 2.47L1 0.16Z" fill="currentColor"/></svg>'
                item.appendChild(arrow)

                item.addEventListener('click', (ev) => {
                    ev.stopPropagation()
                    this._toggleSubmenu(groupName, tools, item, options)
                })
            }

            this._container.appendChild(item)
        })

        // Separator
        const sep = document.createElement('span')
        sep.className = 'equicharts-drawing-bar__sep'
        this._container.appendChild(sep)

        // Mode toggle (weak/strong magnet)
        const modeBtn = document.createElement('div')
        modeBtn.className = 'equicharts-drawing-bar__item'
        modeBtn.title = 'Magnet Mode'
        modeBtn.innerHTML = svgIcon('<path d="M12 2a4 4 0 014 4v6a4 4 0 01-8 0V6a4 4 0 014-4z"/>', 16)
        let currentMode = 'normal'
        modeBtn.addEventListener('click', () => {
            currentMode = currentMode === 'normal' ? 'weak_magnet' : currentMode === 'weak_magnet' ? 'strong_magnet' : 'normal'
            modeBtn.classList.toggle('active', currentMode !== 'normal')
            options.onModeChange?.(currentMode)
        })
        this._container.appendChild(modeBtn)

        // Lock toggle
        const lockBtn = document.createElement('div')
        lockBtn.className = 'equicharts-drawing-bar__item'
        lockBtn.title = 'Lock Drawings'
        lockBtn.innerHTML = svgIcon(icons.lock, 16)
        let locked = false
        lockBtn.addEventListener('click', () => {
            locked = !locked
            lockBtn.classList.toggle('active', locked)
            options.onLockChange?.(locked)
        })
        this._container.appendChild(lockBtn)

        // Visibility toggle
        const visBtn = document.createElement('div')
        visBtn.className = 'equicharts-drawing-bar__item'
        visBtn.title = 'Show/Hide Drawings'
        visBtn.innerHTML = svgIcon(icons.visible, 16)
        let visible = true
        visBtn.addEventListener('click', () => {
            visible = !visible
            visBtn.classList.toggle('active', !visible)
            options.onVisibleChange?.(visible)
        })
        this._container.appendChild(visBtn)

        // Remove all
        const removeBtn = document.createElement('div')
        removeBtn.className = 'equicharts-drawing-bar__item'
        removeBtn.title = 'Remove All Drawings'
        removeBtn.innerHTML = svgIcon(icons.remove, 16)
        removeBtn.addEventListener('click', () => {
            options.onRemoveClick?.()
        })
        this._container.appendChild(removeBtn)

        // Click outside closes submenu
        document.addEventListener('click', () => this._closeSubmenu())
    }

    get element(): HTMLDivElement {
        return this._container
    }

    destroy(): void {
        this._closeSubmenu()
        this._container.remove()
    }

    private _setActiveTool(_name: string, btn: HTMLElement): void {
        this._container.querySelectorAll('.equicharts-drawing-bar__item').forEach(el => el.classList.remove('selected'))
        btn.classList.add('selected')
    }

    private _toggleSubmenu(groupName: string, tools: string[], anchor: HTMLElement, options: DrawingBarOptions): void {
        if (this._activeGroup === groupName && this._submenu) {
            this._closeSubmenu()
            return
        }
        this._closeSubmenu()
        this._activeGroup = groupName

        const menu = document.createElement('div')
        menu.className = 'equicharts-drawing-bar__submenu'

        tools.forEach(tool => {
            const li = document.createElement('div')
            li.className = 'equicharts-drawing-bar__submenu-item'
            li.textContent = tool
            li.addEventListener('click', (ev) => {
                ev.stopPropagation()
                this._setActiveTool(tool, anchor)
                options.onDrawingItemClick?.(tool)
                this._closeSubmenu()
            })
            menu.appendChild(li)
        })

        // Position next to anchor
        const rect = anchor.getBoundingClientRect()
        menu.style.position = 'fixed'
        menu.style.left = `${rect.right + 4}px`
        menu.style.top = `${rect.top}px`
        document.body.appendChild(menu)
        this._submenu = menu
    }

    private _closeSubmenu(): void {
        if (this._submenu) {
            this._submenu.remove()
            this._submenu = null
            this._activeGroup = null
        }
    }
}
