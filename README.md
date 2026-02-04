# Memory Card Flip Game

Một trò chơi trí nhớ (Memory) đơn giản bằng HTML/CSS/JS — lật các lá bài để tìm các cặp giống nhau.

## Mô tả

Trò chơi bao gồm 8 lá bài (4 cặp). Mục tiêu là tìm và ghép các cặp bằng cách lật hai lá bài mỗi lượt. Ghi lại số lượt (moves), số cặp đã tìm (matches) và thời gian chơi.

## Tính năng

- Giao diện responsive (4 cột trên desktop, 2 cột trên di động)
- Đếm lượt (moves) và thời gian (timer)
- Nút `Reset Game`, `New Game` và `Play Again`
- Thông báo khi hoàn thành với thống kê lượt và thời gian

## Cách chơi

1. Mở trang `index.html` trên trình duyệt (hoặc chạy server tĩnh và truy cập vào trang).
2. Nhấn vào một lá bài để lật. Nhấn lá bài thứ hai để so sánh.
3. Nếu hai lá bài giống nhau, chúng sẽ được đánh dấu là `matched` và giữ nguyên trạng thái lật.
4. Nếu không giống, hai lá bài sẽ lật lại sau một khoảng ngắn.
5. Trò chơi kết thúc khi bạn tìm đủ 4 cặp. Khi thắng, sẽ hiển thị hộp thông báo với số lượt và thời gian.

Ghi chú: Bộ đếm thời gian bắt đầu khi bạn lật lá bài đầu tiên. Số lượt tăng mỗi khi bạn lật hai lá bài.

## Điều khiển

- Click vào thẻ: lật thẻ
- `Reset Game`: Đặt lại trạng thái hiện tại (trả mọi thẻ về ban đầu và xóa thống kê)
- `New Game`: Khởi tạo lại và xáo bài mới
- `Play Again`: Bắt đầu lại từ màn chiến thắng

## Chạy dự án

- Cách nhanh nhất: mở file `index.html` bằng trình duyệt (double-click hoặc `Open with`).
- Nếu muốn chạy trên server tĩnh (tùy chọn):

  - Với `http-server` (Node.js):

    ```bash
    npx http-server
    ```

  - Hoặc sử dụng bất kỳ server tĩnh nào và mở `http://localhost:<port>` tới thư mục dự án.

## Tuỳ chỉnh

- Biểu tượng thẻ và cặp: chỉnh mảng `cardSymbols` trong `script.js` để thay đổi biểu tượng.
- Kiểu dáng: chỉnh `style.css` để thay đổi kích thước, màu sắc, bố cục.

## Phát triển & Ghi chú

- Mã nguồn gồm: `index.html`, `style.css`, `script.js`.
- Thiết kế tối giản, dễ mở rộng (thêm cặp, thêm mức độ khó, thêm bảng xếp hạng).


