export const mockChats = [
  {
    id: "chat1",
    name: "Pizza Hut Seller",
    avatar: "https://ui-avatars.com/api/?name=Pizza+Hut",
    lastMessage: "Đã nhận đơn hàng của bạn!",
    timestamp: "14:32",
    unread: 2,
    online: true,
  },
  {
    id: "group1",
    name: "Hỗ trợ đơn #12345",
    avatar: "https://ui-avatars.com/api/?name=Support",
    lastMessage: "Admin: Cảm ơn feedback!",
    timestamp: "14:25",
    unread: 0,
    online: false,
  },
  {
    id: "chat2",
    name: "Bánh mì Seller",
    avatar: "https://ui-avatars.com/api/?name=Banh+Mi",
    lastMessage: "Giao hàng trong 30p nhé",
    timestamp: "13:50",
    unread: 5,
    online: true,
  },
];

export const mockMessages = {
  chat1: [
    {
      id: 1,
      sender: "Pizza Hut",
      content: "Chào bạn, đơn hàng đã nhận!",
      type: "text",
      time: "14:30",
      mine: false,
    },
    {
      id: 2,
      sender: "You",
      content: "Cảm ơn, giao nhanh nhé",
      type: "text",
      time: "14:31",
      mine: true,
    },
    {
      id: 3,
      sender: "Pizza Hut",
      content: "Đã nhận đơn hàng của bạn!",
      type: "text",
      time: "14:32",
      mine: false,
    },
  ],
  group1: [
    {
      id: 1,
      sender: "Admin",
      content: "Nhóm hỗ trợ đơn #12345",
      type: "text",
      time: "14:20",
      mine: false,
    },
    {
      id: 2,
      sender: "You",
      content: "Invoice đây ạ",
      type: "image",
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=320",
      time: "14:22",
      mine: true,
    },
  ],
};
