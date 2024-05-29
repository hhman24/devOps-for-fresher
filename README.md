# Linux

## Cài đặt Ubuntu serve

Note: Trong VMware có cài đặt mạng:

* NAT

    * Điểm mạnh: Có thể truy cập từ chính thiết bị đó. Nên dùng khi sử dụng laptop. Cần ghi nhớ địa chỉ gateway Ip của NAT setting.

* Bridge 

    * Điểm mạnh: Khi triển khai thành công web. Thì có thể truy cập bằng các thiệt bị nội bộ. Nên dùng khi sử dụng PC

Nên set địa chỉ Ip tĩnh cho server

> sudo -i

Lệnh sudo dùng cho user root, có quyền truy cập tối cáo nhất trong hệ thống

> nano /etc/netplan/00-installer-config.yaml

Ta thấy được thông tin network: tên card mạng, dhcp, version

Cấu hình lại địa chỉ tĩnh:

```
network:
    ethernets:
      ens33:
        dhcp4: false
        addresses: [192.168.14.10/24]
        gateway4: 192.168.14.2
        nameservers:
          addresses: [8.8.8.8,8.8.4.4]
```

Note: Nếu sử dụng NAT thì phải địa chỉ IP là có cùng subnetmask với gateway trong NAT edit>Virtual Machine editor>setting

Sử dụng cấu hình network mới

> netplan apply

Kiểm tra kết nối

> ip a

Note: chú ý phần tên card mạng mình sử dụng có đúng địa chỉ nãy mình set chưa

Tắt máy. Tạo ra một phiên bản backup snapshot dùng để sử dụng lại, khi bị lỗi không cần cái đặt lại.

Kết nối ssh bằng terminal window 

> ssh ainz@192.168.14.10

## Các câu lệnh Linux thông dụng

1. Cho biết biết vị trí hiện tại

> pwd

2. Cho biết phiên user hiện tại

> whoami

3. Hệ thống file trong linux

![file system linux](./images/linux-filesystem.png)

Các loại file mà Linux hỗ trợ

* Filesystem cơ bản: EXT2, EXT3, EXT4, XFS, Btrfs, JFS, NTFS,…
* Filesystem dành cho dạng lưu trữ Flash: thẻ nhớ,…
* Filesystem dành cho hệ cơ sở dữ liệu
* Filesystem mục đích đặc biệt: procfs, sysfs, tmpfs, squashfs, debugfs,…

File system của hệ điều hanh Linux được tổ chức theo tiêu chuẩn cấp bậc của hệ thống tập tin **Filesystem Hierarchy Standard (FHS)**.

Linux dùng `/` để tách các đường dẫn --> (`/`) là thư mục gốc

|Thư mục|Chức năng|
|-------|---------|
| /bin  | Essential user command binaries |