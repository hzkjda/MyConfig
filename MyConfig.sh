if [ -r ~/.alias.sh ]; then
    source ~/.alias.sh
fi

if [ ! -d /tmp/wu ]; then
    mkdir /tmp/wu
elif [ ! -e ~/temp ]; then
    ln -s /tmp/wu ~/temp
fi

if [ ! -e ~/temp/VirtualBox ]; then
    ln -s ~/Downloads/UseLess/VirtualBox ~/temp/
fi

#cd ~/Temp

################################################################

#alias fbterm='export LANG=zh_CN.UTF-8 && export LANGUAGE=zh_CN:zh && export LC_CTYPE=zh_CN.UTF-8 && fbterm'

#alias startxfce4='export LANG=zh_CN.UTF-8 && export LANGUAGE=zh_CN:zh && export LC_CTYPE=zh_CN.UTF-8 && startxfce4'
