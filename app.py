# -*- coding: utf-8 -*-
"""
MC指令生成器 - Java 1.20.1 指令生成器外壳
由Escape制作，适用于JAVA1.20.1
"""
import os
import sys
import webview


def resource_path(rel):
    """打包后从 _MEIPASS 取资源，开发时从脚本目录取。"""
    base = getattr(sys, '_MEIPASS', os.path.dirname(os.path.abspath(__file__)))
    return os.path.join(base, rel)


def main():
    index = resource_path(os.path.join('web', 'index.html'))
    icon = resource_path(os.path.join('web', 'assets', 'icon.ico'))

    window = webview.create_window(
        'MC指令生成器',
        index,
        width=1320,
        height=860,
        min_size=(980, 660),
        background_color='#0b0f14',
        text_select=False,
    )
    webview.start(debug=False, http_server=True, icon=icon if os.path.exists(icon) else None)


if __name__ == '__main__':
    main()
