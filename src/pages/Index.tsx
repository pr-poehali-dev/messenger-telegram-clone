import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  const chats = [
    { id: 1, name: 'Анна Петрова', lastMessage: 'Привет! Как дела?', time: '14:30', unread: 3, online: true },
    { id: 2, name: 'Команда проекта', lastMessage: 'Собрание завтра в 10:00', time: '13:45', unread: 1, online: false, isGroup: true },
    { id: 3, name: 'Мария Сидорова', lastMessage: 'Отправила файлы', time: '12:20', unread: 0, online: false },
    { id: 4, name: 'JavaScript разработчики', lastMessage: 'Новая библиотека вышла', time: '11:15', unread: 5, online: false, isGroup: true },
  ];

  const messages = selectedChat ? [
    { id: 1, text: 'Привет!', sender: 'other', time: '14:25' },
    { id: 2, text: 'Как дела?', sender: 'other', time: '14:26' },
    { id: 3, text: 'Отлично! А у тебя как?', sender: 'me', time: '14:30' },
    { id: 4, text: 'Тоже хорошо 😊', sender: 'other', time: '14:31' },
  ] : [];

  const navItems = [
    { id: 'chats', label: 'Чаты', icon: 'MessageCircle' },
    { id: 'groups', label: 'Группы', icon: 'Users' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' },
    { id: 'profile', label: 'Профиль', icon: 'User' },
  ];

  const emojis = ['😊', '😂', '❤️', '👍', '😍', '🎉', '🔥', '💯'];
  const stickers = ['🐱', '🐶', '🦊', '🐸', '🐼', '🦄', '🐯', '🐻'];

  return (
    <div className="h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-80 bg-card border-r border-border flex flex-col">
        {/* Navigation */}
        <div className="p-4 border-b border-border">
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                size="sm"
                className="flex-1 justify-center"
                onClick={() => setActiveTab(item.id)}
              >
                <Icon name={item.icon} size={16} />
              </Button>
            ))}
          </div>
        </div>

        {/* Chat List */}
        {activeTab === 'chats' && (
          <div className="flex-1 overflow-y-auto">
            {chats.filter(chat => !chat.isGroup).map((chat) => (
              <div
                key={chat.id}
                className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedChat?.id === chat.id ? 'bg-muted' : ''
                }`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {chat.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm truncate">{chat.name}</h3>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      {chat.unread > 0 && (
                        <Badge variant="default" className="bg-primary text-primary-foreground min-w-[20px] h-5 text-xs">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Groups List */}
        {activeTab === 'groups' && (
          <div className="flex-1 overflow-y-auto">
            {chats.filter(chat => chat.isGroup).map((chat) => (
              <div
                key={chat.id}
                className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedChat?.id === chat.id ? 'bg-muted' : ''
                }`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-green-500 text-white">
                      <Icon name="Users" size={20} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm truncate">{chat.name}</h3>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      {chat.unread > 0 && (
                        <Badge variant="default" className="bg-primary text-primary-foreground min-w-[20px] h-5 text-xs">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <div className="flex-1 p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <Icon name="Bell" size={20} />
                  <span className="text-sm">Уведомления</span>
                </div>
                <Button variant="outline" size="sm">Настроить</Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <Icon name="Shield" size={20} />
                  <span className="text-sm">Приватность</span>
                </div>
                <Button variant="outline" size="sm">Изменить</Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <Icon name="Palette" size={20} />
                  <span className="text-sm">Тема</span>
                </div>
                <Button variant="outline" size="sm">Выбрать</Button>
              </div>
            </div>
          </div>
        )}

        {/* Profile */}
        {activeTab === 'profile' && (
          <div className="flex-1 p-4">
            <div className="text-center space-y-4">
              <Avatar className="h-20 w-20 mx-auto">
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">ВИ</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">Ваше Имя</h2>
                <p className="text-sm text-muted-foreground">@username</p>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Icon name="Edit" size={16} className="mr-2" />
                  Редактировать профиль
                </Button>
                <Button variant="outline" className="w-full">
                  <Icon name="LogOut" size={16} className="mr-2" />
                  Выйти
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className={selectedChat.isGroup ? "bg-green-500 text-white" : "bg-primary text-primary-foreground"}>
                    {selectedChat.isGroup ? <Icon name="Users" size={16} /> : selectedChat.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="font-semibold text-sm">{selectedChat.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {selectedChat.online ? 'В сети' : 'Был в сети недавно'}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Icon name="Phone" size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="Video" size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="MoreVertical" size={16} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    msg.sender === 'me' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-foreground'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'me' 
                        ? 'text-primary-foreground/70' 
                        : 'text-muted-foreground'
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Emoji and Stickers */}
            <div className="p-2 border-t border-border bg-card">
              <div className="flex space-x-2 mb-2">
                <div className="flex space-x-1">
                  {emojis.map((emoji, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-lg hover:bg-muted"
                      onClick={() => setMessage(prev => prev + emoji)}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
                <div className="flex space-x-1">
                  {stickers.map((sticker, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-lg hover:bg-muted"
                      onClick={() => setMessage(prev => prev + sticker)}
                    >
                      {sticker}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Icon name="Paperclip" size={16} />
                </Button>
                <Input
                  placeholder="Написать сообщение..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && message.trim()) {
                      setMessage('');
                    }
                  }}
                />
                <Button 
                  size="sm" 
                  disabled={!message.trim()}
                  onClick={() => setMessage('')}
                >
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-muted/10">
            <div className="text-center space-y-4">
              <Icon name="MessageCircle" size={64} className="mx-auto text-muted-foreground" />
              <div>
                <h2 className="text-xl font-semibold text-muted-foreground">Выберите чат</h2>
                <p className="text-sm text-muted-foreground mt-2">Начните общение, выбрав чат из списка</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;