const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  VerticalAlign,
  WidthType,
} = require("docx");

const table = new Table({
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `STT`,
                  size: 24,
                  font: "arial",
                  bold: true,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `Tên Thuốc`,
                  size: 24,
                  font: "arial",
                  bold: true,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `Đơn vị`,
                  size: 24,
                  font: "arial",
                  bold: true,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `Số lượng`,
                  size: 24,
                  font: "arial",
                  bold: true,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `Đơn giá (VND)`,
                  size: 24,
                  font: "arial",
                  bold: true,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `Thành tiền (VND)`,
                  font: "arial",
                  size: 24,
                  bold: true,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
      ],
      tableHeader: true,
      height: { value: 500 },
    }),
  ],
  width: {
    size: 8500,
    type: WidthType.DXA,
  },
});

//
testData.map((data, index) => {
  const tableRow = new TableRow({
    children: [
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `${index + 1}`,
                size: 20,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
        verticalAlign: VerticalAlign.CENTER,
      }),
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `${data.Ten}`,
                size: 20,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
        verticalAlign: VerticalAlign.CENTER,
      }),
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `${data.DonVi}`,
                size: 20,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
        verticalAlign: VerticalAlign.CENTER,
      }),
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `${data.SoLuong}`,
                size: 20,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
        verticalAlign: VerticalAlign.CENTER,
      }),
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `${data.DonGia}`,
                size: 20,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
        verticalAlign: VerticalAlign.CENTER,
      }),
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `${data.ThanhTien}`,
                size: 20,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
        verticalAlign: VerticalAlign.CENTER,
      }),
    ],
    height: { value: 300 },
  });

  table.root.push(tableRow);
});

const doc = new Document({
  sections: [
    {
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: `Hóa đơn bán thuốc`,
              size: 40,
              bold: true,
              font: "arial",
            }),
          ],
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: {
            after: 100,
          },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Ngày `,
              size: 32,
              bold: true,
              font: "arial",
            }),
            new TextRun({
              text: `${dmy[1]} `,
              size: 32,
              font: "arial",
            }),
            new TextRun({
              text: `tháng `,
              size: 32,
              bold: true,
              font: "arial",
            }),
            new TextRun({
              text: `${dmy[0]} `,
              size: 32,
              font: "arial",
            }),
            new TextRun({
              text: `năm `,
              size: 32,
              bold: true,
              font: "arial",
            }),
            new TextRun({
              text: `${dmy[2]}`,
              size: 32,
              font: "arial",
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: {
            after: 500,
          },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Hiệu thuốc Thiện Nguyễn                          Mã số hóa đơn: `,
              size: 28,
              bold: true,
              font: "arial",
            }),
            new TextRun({
              text: `${HD.IDHoaDonXuat}`,
              size: 28,
              font: "arial",
            }),
          ],
          spacing: {
            after: 100,
          },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Tên nhân viên: `,
              size: 28,
              bold: true,
              font: "arial",
            }),
            new TextRun({ text: `${HD.HoTen}`, size: 28, font: "arial" }),
          ],
          spacing: {
            after: 100,
          },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Tên khách hàng: `,
              size: 28,
              bold: true,
              font: "arial",
            }),
            new TextRun({
              text: `${HD.TenKhachHang}`,
              size: 28,
              font: "arial",
            }),
          ],
          spacing: {
            after: 100,
          },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Số điện thoại: `,
              size: 28,
              bold: true,
              font: "arial",
            }),
            new TextRun({ text: `${HD.DienThoai}`, size: 28, font: "arial" }),
          ],
          spacing: {
            after: 100,
          },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Email: `,
              size: 28,
              bold: true,
              font: "arial",
            }),
            new TextRun({
              text: `${HD.Email}`,
              size: 28,
              font: "arial",
            }),
          ],
          spacing: {
            after: 200,
          },
        }),
        table,
        new Paragraph({
          children: [
            new TextRun({
              text: `Thuế: `,
              size: 28,
              bold: true,
              font: "arial",
            }),
            new TextRun({
              text: `${HD.Thue}`,
              size: 28,
              font: "arial",
            }),
          ],
          spacing: {
            before: 200,
            after: 100,
          },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Tổng cộng: `,
              size: 28,
              bold: true,
              font: "arial",
            }),
            new TextRun({
              text: `${HD.TongTien}`,
              size: 28,
              font: "arial",
            }),
          ],
          spacing: {
            before: 200,
            after: 100,
          },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Nhân viên lập phiếu                                      Khách hàng `,
              size: 28,
              bold: true,
              font: "arial",
            }),
          ],
          spacing: {
            before: 500,
            after: 100,
          },
        }),
      ],
    },
  ],
});
